import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function MembersList() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/member/all`).then(res => setMembers(res.data));
    }, []);
    return (
        <div>
            <h2>Danh sách thành viên</h2>
            <button onClick={() => navigate(-1)}>Quay lại</button>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Số bài</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={member.id}>
                            <td>{index + 1}</td>
                            <Link to={`/profile/${member.id}`}>{member.username}</Link>
                            <td>{member.solved_problems}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}