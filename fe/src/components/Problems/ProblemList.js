import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProblemList({ onSelect, isAdmin, onAdminAddProblem }) {
    const [problems, setProblems] = useState([]);

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