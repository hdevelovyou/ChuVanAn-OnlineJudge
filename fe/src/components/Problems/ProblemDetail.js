import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProblemDetail({ onSubmitClick, onViewAllSubmissions, onViewBestSubmissions }) {
    const [problem, setProblem] = useState(null);
    const { problemId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!problemId) return;
        axios.get(`${process.env.REACT_APP_API_URL}/api/problem/${problemId}`)
            .then(res => setProblem(res.data));
    }, [problemId]);

    if (!problem) return <div>Đang tải...</div>;

    return (
        <div className="problem-detail">
            <h2>{problem.title}</h2>
            <div>
                <span className="label">Giới hạn thời gian:</span> {problem.time_limit || '1s'}
                <span className="label" style={{marginLeft: 16}}>Giới hạn bộ nhớ:</span> {problem.memory_limit || '256MB'}
                <span className="label" style={{marginLeft: 16}}>Dạng bài:</span> {problem.type || 'Lập trình'}
                <span className="label" style={{marginLeft: 16}}>Ngôn ngữ:</span> {(['C++', 'Python']).join(', ')}
            </div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            <div>
                <h4>Input</h4>
                <pre>{problem.input_format}</pre>
                <h4>Output</h4>
                <pre>{problem.output_format}</pre>
                <h4>Sample Input</h4>
                <pre>{problem.sample_input}</pre>
                <h4>Sample Output</h4>
                <pre>{problem.sample_output}</pre>
            </div>
            <div style={{marginTop: 24}}>
                <button onClick={() => navigate(`/problems/${problemId}/submit`)}>Gửi bài giải</button>
                <button onClick={() => onViewAllSubmissions(problemId)} style={{marginLeft: 8}}>Tất cả bài nộp</button>
                <button onClick={() => onViewBestSubmissions(problemId)} style={{marginLeft: 8}}>Bài nộp tốt nhất</button>
            </div>
        </div>
    );
}