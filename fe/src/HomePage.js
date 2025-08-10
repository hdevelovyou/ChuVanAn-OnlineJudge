import React from "react";
import logo from "./assets/images/LOGO_CVAOJ.png";

export default function HomePage({ onLogin, onRegister}) {
    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="CVAOJ Logo" />
                    <span>CVAOJ</span>
        </div>
        <div className="navbar_actions">
            <button onClick={onLogin}>Đăng nhập</button>
            <button onClick={onRegister}>Đăng ký</button>
        </div>
        </nav>
        <div className="hompage_banner">
            <h1>Chào mừng đến với Chu Van An Online-Judge!</h1>
            <p>Hệ thống chấm bài tự động dành cho học sinh chuyên Chu Văn An.</p>
        </div>
        </div>
    )
} 