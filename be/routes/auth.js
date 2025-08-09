const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        //Kiểm tra user đã tồn tại
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if(existingUser.length > 0) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        //Kiểm tra email đã tồn tại
        const [existingEmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if(existingEmail.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        //Lưu thông tin user mới vào Database
        await db.query('INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
        res.status(200).json({ message: 'Đăng ký thành công'});
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Đăng ký không thành công' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if(users.length === 0) 
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match)
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' }); 
        
        // Tạo JWT token
        const token = jwt.sign({ userId: user.id, username: user.username}, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Đăng nhập thành công', token });
    } catch (err) {
        res.status(500).json({ message: 'Đăng nhập không thành công', error: err.message });
    }
});

module.exports = router;