import React, { useState } from 'react';
import axios from 'axios';

export default function VerifyOTP({ email, onVerified}) {
    const [otp, SetOTP] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, { email, otp });
            onVerified(otp);
        } catch (err) {
            setMsg(err.response?.data?.message || 'OTP không hợp lệ hoặc đã hết hạn');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Nhập mã OTP của bạn</h2>
            <input type="text" value={otp} onChange={(e) => SetOTP(e.target.value)} placeholder="Mã OTP gồm 6 kí tự" required />
            <button type="submit">Xác nhận</button>
            <div>{msg}</div>
        </form>
    );
}