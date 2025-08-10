import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                username,
                password
            });
            localStorage.setItem('token', res.data.token);
            setMsg('Đăng nhập thành công!');
        } catch (err) {
            setMsg(err.response?.data?.message || 'Lỗi đăng nhập');
        }
    };
    return (
        <div style={{ padding: '20px' }}>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
                <button type="button" onClick={onBack}>Quay lại</button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}
