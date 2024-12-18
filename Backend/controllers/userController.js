const pool = require('../db'); // เชื่อมต่อกับ PostgreSQL database
const session = require('express-session');
const jwt = require('jsonwebtoken');  // นำเข้า express-session

// ตั้งค่า express-session
const sessionOptions = {
    secret: 'your_session_secret',  // คีย์สำหรับการเข้ารหัส session
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // ถ้าใช้ HTTPS จะต้องตั้งเป็น true
};

// ฟังก์ชันเพิ่มผู้ใช้ใหม่
const createUser = async (req, res) => {
    const { firstname, lastname, date_of_birth, tel, email, password, username, profile_picture } = req.body;

    try {
        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            // ถ้าอีเมลซ้ำ ส่งข้อความผิดพลาด
            return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานไปแล้ว' });
        }

        // หากไม่ซ้ำ ให้ทำการเพิ่มข้อมูลผู้ใช้
        const insertResult = await pool.query(
            'INSERT INTO "users" (firstname, lastname, date_of_birth, tel, email, password, username, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [firstname, lastname, date_of_birth, tel, email, password, username, profile_picture || null]
        );

        // ส่งข้อมูลผู้ใช้ที่เพิ่มไปแล้วกลับไปที่ฝั่ง Client
        res.status(201).json(insertResult.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันล็อกอิน
const UserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ตรวจสอบว่าอีเมลและรหัสผ่านตรงกับข้อมูลในฐานข้อมูลหรือไม่
        const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // ตรวจสอบรหัสผ่าน (ในกรณีจริง ควรใช้การแฮชรหัสผ่าน)
            if (user.password === password) {
                // สร้าง JWT Token
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                    },
                    'your_secret_key', // เปลี่ยนเป็น key ลับของคุณ
                    { expiresIn: '1h' } // กำหนดให้ token หมดอายุใน 1 ชั่วโมง
                );

                // ส่ง token กลับไปที่ frontend พร้อมกับข้อความ
                res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', token });
            } else {
                res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
            }
        } else {
            res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ดึงข้อมูลผู้ใช้จาก session
const getUser = async (req, res) => {
    try {
      // ดึง token จาก header Authorization
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      // ตรวจสอบและ decode token
      const decoded = jwt.verify(token, 'your_secret_key'); // ใช้ secret key ที่ใช้สร้าง token
  
      // ดึงข้อมูลจาก decoded token
      const { id, firstname, lastname } = decoded;
  
      res.status(200).json({ firstname, lastname });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = {
    createUser,
    UserLogin,
    getUser,
};
