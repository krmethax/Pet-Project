const express = require('express');
const { createUser } = require('../controllers/userController');
const { UserLogin } = require('../controllers/userController');
const { getUser } = require('../controllers/userController');
const router = express.Router();

// Route สำหรับเพิ่มผู้ใช้ใหม่
router.post('/create', createUser);
router.post('/login', UserLogin);
router.get('/getuser', getUser);


module.exports = router;
