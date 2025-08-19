const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Chưa đăng nhập' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
}

module.exports = isAdmin;
