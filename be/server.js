const express = require('express');
const db = require('./config/connectDB');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const authRouter = require('./routes/auth');
app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ solution: rows[0].solution });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).send('Database connection failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});