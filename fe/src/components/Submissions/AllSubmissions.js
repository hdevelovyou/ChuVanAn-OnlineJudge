import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function SubmissionsList() {
    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/submission/allHome`)
            .then(res => setSubmissions(res.data));
    }, []);
    return (
        <div>
            <h3>Tất cả bài nộp</h3>
            <button onClick={() => navigate(-1)}>Quay lại</button>
            <table>
                <thead>
                    <tr>
                        <th>Bài tập</th>
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
                            <td>
                                <Link to={`/problems/${submission.problem_id}`}>
                                    {submission.problem_title}
                                </Link>
                            </td>
                            <td>{submission.status}</td>
                            <td>{submission.username}</td>
                            <td>{new Date(submission.submitted_at).toLocaleString('vi-VN')}</td>
                            <td>{submission.language}</td>
                            <td>{submission.score || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}