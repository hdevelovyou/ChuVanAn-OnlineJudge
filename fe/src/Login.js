import React, { useState } from 'react';
import axios from 'axios';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';

export default function Login({ onBack, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                username,
                password
            });
            localStorage.setItem('token', res.data.token);
            setMsg('Đăng nhập thành công!');
            if(onLoginSuccess) {
                onLoginSuccess(username);
            }
        } catch (err) {
            setMsg(err.response?.data?.message || 'Lỗi đăng nhập');
        }
    };

    if (showForgot) {
        if(!otpVerified) {
            return (
                <ForgotPassword
                    onOTPRequested={(email) => {
                        setForgotEmail(email);
                        setOtpVerified(true);
                        setOtp('');
                    }}
                />
            );
        } else if(!otp){
            return (
                <VerifyOTP
                    email={forgotEmail}
                    onVerified={(otp) => {
                        setOtpVerified(true);
                        setOtp(otp);
                    }}
                />
            );
        } 
        else if (otpVerified) {
            return (
                <ResetPassword
                    email={forgotEmail}
                    otp={otp}
                    onSuccess={() => {
                        setOtpVerified(false);
                        setShowForgot(false);
                        setMsg('Đặt lại mật khẩu thành công!');
                    }}
                />
            );
        }
    }

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
                <button type="button" onClick={() => setShowForgot(true)}>
                    Quên mật khẩu?
                </button>
            </form>
            {msg && <p>{msg}</p>}
        </div>
    );
}
