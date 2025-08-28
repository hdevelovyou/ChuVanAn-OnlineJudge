import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO_CVAOJ.png";
import "./Navbar.scss";

export default function Navbar({ onLogout }) {
    const username = localStorage.getItem('username') || '';
    const navigate = useNavigate();
    
    return (
        <nav>
            <Link to="/" className="navbar_logo_link">
                <img src={logo} alt="CVAOJ Logo" className="navbar_logo"/>
            </Link>
            <Link className="problems" to="/problems">Bài tập</Link>
            <Link className="submissions" to="/submissions/all">Các bài nộp</Link>
            <Link className="members" to="/members/all">Danh sách thành viên</Link>
            <div className="navbar_user">
                {username ? <>Xin chào <b>{username}</b> 
                        <button className="btn-logout" onClick={onLogout}>Đăng xuất</button>
                         </>: <Link to="/login">Đăng nhập</Link>}
            </div>
        </nav>
    );
}