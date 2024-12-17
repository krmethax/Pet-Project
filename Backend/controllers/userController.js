const pool = require('../db'); // เชื่อมต่อกับ PostgreSQL database
const jwt = require('jsonwebtoken');

// เพิ่มผู้ใช้ใหม่
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
            [firstname, lastname, date_of_birth, tel, email, password, username, profile_picture || null] // Profile picture สามารถเป็น null ได้
        );

        // ส่งข้อมูลผู้ใช้ที่เพิ่มไปแล้วกลับไปที่ฝั่ง Client
        res.status(201).json(insertResult.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

  
const UserLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Query to check if the user exists with the provided email and password
        const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            
            // Verify the password (you should hash the password in a real scenario)
            if (user.password === password) {
                const payload = {
                    userId: user.id, 
                    email: user.email,
                };

                // Generate JWT with secret key and expiration
                const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

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

module.exports = {
  createUser,
  UserLogin,
};
