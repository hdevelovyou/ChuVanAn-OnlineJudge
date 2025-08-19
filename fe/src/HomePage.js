import React from "react";
import logo from "./assets/images/LOGO_CVAOJ.png";
import { useNavigate } from "react-router-dom";

export default function HomePage({ onLogin, onRegister, isLoggedIn, username, onLogout, onViewProblems}) {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="CVAOJ Logo" />
                    <span>CVAOJ</span>
        </div>
        <div className="navbar_actions">
            <button onClick={onViewProblems}>Bài tập</button>
            <button onClick={() => navigate('/submissions/all')}>Tất cả bài nộp</button>
            {isLoggedIn ? (
            <>
                <span style={{ marginRight: '20px' }}>Xin chào, <b>{username}</b></span>
                <button onClick={onLogout}>Đăng xuất</button>
            </>
            ) : (
                <>
                    <button onClick={onLogin}>Đăng nhập</button>
                    <button onClick={onRegister}>Đăng ký</button>
                </>
            )}
        </div>
        </nav>
        <div className="hompage_banner">
            <h1>Chào mừng đến với Chu Van An Online-Judge!</h1>
            <p>Hệ thống chấm bài tự động dành cho học sinh chuyên Chu Văn An.</p>
        </div>
        </div>
    )
} 