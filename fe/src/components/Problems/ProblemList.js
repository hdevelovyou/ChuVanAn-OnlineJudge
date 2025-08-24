import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProblemList({ onSelect, isAdmin, onAdminAddProblem }) {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/problem/list`).then(res => setProblems(res.data));
    }, []);

    console.log('isAdmin:', isAdmin); // Debugging line to check if isAdmin is passed correctly

    return (
        <div>
            <h2>Danh sách bài tập</h2>
            {
                isAdmin && (
                    <button onClick={onAdminAddProblem}>Thêm bài tập</button>
                )
            }
            <button onClick={() => navigate(-1)}>Quay lại</button>
            <ul>
                {problems.map(problem => (
                    <li key={problem.id}>
                        <a href="#" onClick={() => onSelect(problem.id)}>{problem.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}