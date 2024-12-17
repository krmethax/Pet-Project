const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// เชื่อม Route ของผู้ใช้
app.use('/api/users', userRoutes);

// เริ่มเซิร์ฟเวอร์ให้รันบน IP ของเครื่อง 192.168.1.169 และพอร์ต 3000
app.listen(PORT, '192.168.242.111', () => {
  console.log(`Server is running on http://192.168.242.111:${PORT}`);
});
