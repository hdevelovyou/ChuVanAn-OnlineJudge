import React from "react";
import logo from "./assets/images/LOGO_CVAOJ.png";
import { useNavigate } from "react-router-dom";

export default function HomePage({ onLogin, onRegister, isLoggedIn, username, onLogout, onViewProblems}) {
    return (
        <div className="homepage">
        <div className="hompage_banner">
            <h1>Chào mừng đến với Chu Van An Online-Judge!</h1>
            <p>Hệ thống chấm bài tự động dành cho học sinh chuyên Chu Văn An.</p>
        </div>
        </div>
    )
} 