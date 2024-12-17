const pool = require('../db'); // เชื่อมต่อกับ PostgreSQL database
const session = require('express-session'); // นำเข้า express-session

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
            
            // ตรวจสอบรหัสผ่าน (ในกรณีจริง ควรแฮชรหัสผ่าน)
            if (user.password === password) {
                // เก็บข้อมูลผู้ใช้ใน session
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                };

                res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
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
const getUserByEmail = async (req, res) => {
    // ตรวจสอบว่า session มีข้อมูลผู้ใช้หรือไม่
    if (req.session.user) {
        const { email } = req.session.user;
        try {
            const result = await pool.query('SELECT firstname, lastname FROM "users" WHERE email = $1', [email]);
            
            if (result.rows.length > 0) {
                const user = result.rows[0];
                res.json({
                    firstname: user.firstname,
                    lastname: user.lastname,
                });
            } else {
                res.status(404).json({ message: 'ไม่พบผู้ใช้' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
        }
    } else {
        res.status(401).json({ message: 'กรุณาล็อกอินก่อน' });
    }
};

module.exports = {
  createUser,
  UserLogin,
  getUserByEmail,
};
