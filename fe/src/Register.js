import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onBack, onRegisterSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', {
                username,
                password,
                email
            });
            setMsg('Đăng ký thành công!');
            if (onRegisterSuccess) {
                onRegisterSuccess(username);
            }
        } catch (err) {
            setMsg(err.response?.data?.message || 'Lỗi đăng ký');
        }
    };
    return (
        <div style={{ padding: '20px' }}>
            <h2>Đăng ký tài khoản</h2>
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
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng ký</button>
                <button type="button" onClick={onBack}>Quay lại</button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );

}