const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

const otpStore = {};

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if(!email)
        return res.status(400).json({ message: 'Vui lòng nhập email đăng ký'});

    //Kiểm tra email có tồn tại trong database
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if(users.length === 0)
        return res.status(400).json({ message: 'Email không tồn tại' });

    //Tạo OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 3 * 60 * 1000 }; // OTP hợp lệ trong 3 phút

    //Gửi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mã OTP đặt lại mật khẩu',
        text: ` Mã OTP của bạn là: ${otp}. Mã OTP này sẽ hết hạn sau 3 phút.`
    });

    res.json({ message: 'Đã gửi mã OTP đến email của bạn!' });
})

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if(!record || record.otp !== otp || Date.now() > record.expires) {
        return res.status(400).json({ message: 'Mã OTP không hợp lệ hoặc đã hết hạn' });
    }
    res.json({ message: 'Mã OTP xác thực thành công, bạn có thể đặt lại mật khẩu' });
})

router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const record = otpStore[email];
    if(!record || record.otp !== otp || Date.now() > record.expires) {
        return res.status(400).json({ message: 'Mã OTP không hợp lệ hoặc đã hết hạn' });
    }
    //hash mật khẩu mới
    const hash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = ? WHERE email = ?', [hash, email]);
    delete otpStore[email]; // Xóa OTP sau khi đặt lại mật khẩu thành công
    res.json({ message: 'Mật khẩu đã được đặt lại thành công' });
});

module.exports = router;