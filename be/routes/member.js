const express = require('express');
const db = require('../config/connectDB');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const [rows] = await db.query (
            `SELECT users.id, users.username, users.created_at,
            COUNT(DISTINCT CASE WHEN submissions.status = 'accepted' THEN submissions.problem_id END) AS solved_problems
            FROM users LEFT JOIN submissions ON users.id = submissions.user_id
            GROUP BY users.id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách thành viên', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query (
            `SELECT users.username, users.email, users.created_at,
            COUNT(DISTINCT CASE WHEN submissions.status = 'accepted' THEN submissions.problem_id END) AS solved_problems
            FROM users LEFT JOIN submissions ON users.id = submissions.user_id
            WHERE users.id = ?
            GROUP BY users.id`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Thành viên không tồn tại' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin thành viên', error: err.message });
    }
});

module.exports = router;