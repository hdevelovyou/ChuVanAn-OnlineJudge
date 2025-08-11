import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword({ email, otp, onSuccess }) {
    const [newPassword, setNewPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
                email,
                otp,
                newPassword
            });
            setMsg('Đặt lại mật khẩu thành công!');
            onSuccess();
        } catch (err) {
            setMsg(err.response?.data?.message || 'Lỗi đặt lại mật khẩu');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Nhập mật khẩu mới</h2>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="" required />
            <button type="submit">Đặt lại mật khẩu</button>
            <div>{msg}</div>
        </form>
    );
}