const express = require('express');
const db = require('../config/connectDB');
const router = express.Router();
const multer = require('multer');

const upload = multer();

//Nộp bài (đẩy vào queue)
router.post('/submit', upload.single('file'), async (req, res) => {
    const { user_id, problem_id, code, language } = req.body;
    let codeContent = code;
    if (req.file) {
        codeContent = req.file.buffer.toString();
    }
    if (!user_id || !problem_id || (!codeContent) || !language) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }
    // TODO: kiểm tra xác thực user
    try {
        await db.query('INSERT INTO submissions (user_id, problem_id, code, language, status) VALUES (?, ?, ?, ?, ?)', 
            [user_id, problem_id, code, language, 'pending']
        );
        //TODO: đẩy vào queue xử lý
        res.json({ message: 'Nộp bài thành công, đang chờ xử lý' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi nộp bài', error: err.message });
    }
});

// Lấy danh sách bài nộp
router.get('/all', async (req, res) => {
    const { problem_id } = req.query;
    try {
        const [rows] = await db.query(
            `SELECT p.title, s.*, u.username
            FROM problems p
            JOIN submissions s ON p.id = s.problem_id
            JOIN users u ON s.user_id = u.id
            WHERE s.problem_id = ?
            ORDER BY s.submitted_at DESC`,
            [problem_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài nộp', error: err.message });
    }
});

router.get('/allHome', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT p.title AS problem_title, p.id AS problem_id, s.*, u.username
            FROM problems p
            JOIN submissions s ON p.id = s.problem_id
            JOIN users u ON s.user_id = u.id
            ORDER BY s.submitted_at DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài nộp', error: err.message });
    }
});

//Lây danh sách bài nộp tốt nhất
router.get('/best', async (req, res) => {
    const { problem_id } = req.query;
    try {
        const [rows] = await db.query(
            `SELECT s.*, u.username
            FROM submissions s
            JOIN users u ON s.user_id = u.id
            WHERE s.problem_id = ? AND s.status = 'accepted'
            AND s.id IN (
                SELECT MIN(id) FROM submissions 
                WHERE problem_id = ? AND status = 'accepted'
                GROUP BY user_id
            )
            ORDER BY s.created_at DESC`,
            [problem_id, problem_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài nộp tốt nhất', error: err.message });
        return;
    }
});

module.exports = router;