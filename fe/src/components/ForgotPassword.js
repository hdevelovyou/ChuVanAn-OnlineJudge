import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword({ onOTPRequested }) {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });
            setMsg('Đã gửi mã OTP đến email của bạn!');
            onOTPRequested(email);
        } catch (err) {
            setMsg(err.response?.data?.message || 'Lỗi gửi mã OTP');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Quên mật khẩu</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email bạn đã đăng ký" required />
            <button type="submit" disabled={loading}>
                {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
            </button>
            <div>{msg}</div>
        </form>
    );
}