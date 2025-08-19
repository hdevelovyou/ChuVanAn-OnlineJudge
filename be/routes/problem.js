const express = require('express');
const db = require('../config/connectDB');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

//Đăng bài tập mới
router.post('/add', isAdmin, async (req, res) => {
    const { title, description, input_format, output_format, sample_input, sample_output, time_limit, memory_limit, type } = req.body;
    if (!title || !description || !input_format || !output_format || !sample_input || !sample_output || !type) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        await db.query('INSERT INTO problems (title, description, input_format, output_format, sample_input, sample_output, time_limit, memory_limit, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [title, description, input_format, output_format, sample_input, sample_output, time_limit || 1, memory_limit || 256, type || 'standard']);
        res.status(200).json({ message: 'Bài tập đã được thêm thành công' });
    } catch (error) {
        console.error('Error adding problem:', error);
        res.status(500).json({ message: 'Lỗi thêm bài tập' });
    }
});

// Lấy danh sách bài tập
router.get('/list', async (req, res) => {
    const [rows] = await db.query('SELECT id, title, type, created_at FROM problems ORDER BY created_at DESC');
    res.json(rows);
});

// Lấy chi tiết bài tập
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM problems WHERE id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Bài tập không tồn tại' });
    }
    res.json(rows[0]);
});

module.exports = router;