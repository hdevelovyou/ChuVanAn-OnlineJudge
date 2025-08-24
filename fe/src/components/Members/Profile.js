import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Profile() {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/member/${id}`)
        .then(res => setMember(res.data))
        .catch(setMember(null));
    }, [id]);

    if (!member) return <div>Loading...</div>;

    return (
        <div>
            <h2>{member.username}</h2>
            <button onClick={() => navigate(-1)}>Quay lại</button>
            <p>Email: {member.email}</p>
            <p>Số bài đã giải: {member.solved_problems}</p>
            <p>Ngày tham gia: {new Date(member.created_at).toLocaleDateString('vi-VN')}</p>
        </div>
    );
}