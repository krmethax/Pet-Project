const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const connectPgSimple = require('connect-pg-simple')(session); // ใช้ PostgreSQL สำหรับจัดเก็บ session
const pool = require('./db'); // เชื่อมต่อกับ PostgreSQL database
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ตั้งค่า express-session
app.use(session({
  store: new connectPgSimple({
    pool: pool, // ใช้ pool ที่เชื่อมต่อ PostgreSQL
    tableName: 'session', // กำหนดชื่อตารางสำหรับ session
  }),
  secret: 'your_secret_key', // คีย์ที่ใช้เข้ารหัส session
  resave: false, // ไม่ต้องบันทึก session ถ้าไม่ได้มีการแก้ไข
  saveUninitialized: false, // ไม่บันทึก session ถ้ายังไม่ได้เริ่มต้น
  cookie: {
    secure: false, // ใช้ false ถ้าไม่ได้ใช้ HTTPS
    maxAge: 1000 * 60 * 60, // กำหนดเวลา session หมดอายุ (1 ชั่วโมง)
  }
}));

// Middleware
app.use(cors());
app.use(express.json());

// เชื่อม Route ของผู้ใช้
app.use('/api/users', userRoutes);

// เริ่มเซิร์ฟเวอร์ให้รันบน IP และพอร์ตที่กำหนด
const host = '10.253.62.75'; // IP ที่คุณต้องการให้ Express รันบน

app.listen(PORT, host, () => {
  console.log(`Server is running on http://${host}:${PORT}`);
});
