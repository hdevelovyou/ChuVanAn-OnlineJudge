import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BestSubmissions({ onBack }) {
    const [submissions, setSubmissions] = useState([]);
    const [problemTitle, setProblemTitle] = useState('');
    const { problemId } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/submission/best?problem_id=${problemId}`)
            .then(res => setSubmissions(res.data));
        axios.get(`${process.env.REACT_APP_API_URL}/api/problem/${problemId}`)
            .then(res => {
                setProblemTitle(res.data.title);
            });
    }, [problemId]);
    return (
        <div>
            <h3>
                Bài nộp tốt nhất cho {" "}
                    {problemTitle || 'Bài tập'}
            </h3>
            <button onClick={() => onBack(problemId)}>Quay lại</button>
            <table>
                <thead>
                    <tr>
                        <th>Trạng thái</th>
                        <th>Người nộp</th>
                        <th>Thời gian</th>
                        <th>Ngôn ngữ</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(submission => (
                        <tr key={submission.id}>
                            <td>{submission.status}</td>
                            <td>{submission.username}</td>
                            <td>{new Date(submission.created_at).toLocaleString('vi-VN')}</td>
                            <td>{submission.language}</td>
                            <td>{submission.score || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}