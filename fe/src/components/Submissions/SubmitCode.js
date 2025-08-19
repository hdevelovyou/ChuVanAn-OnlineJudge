import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function SubmitCode() {
    const { problemId } = useParams();
    const [problemTitle, setProblemTitle] = useState('');
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('C++');
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState('');

    const handleFileChange = e => {
        setFile(e.target.files[0]);
        setCode('');
    }; 

    const handleCodeChange = e => {
        setCode(e.target.value);
        setFile(null);
    };
    
    const handleSubmit = async e => {
        e.preventDefault();
        if (!code && !file) {
            setMessage('Vui lòng nhập code hoặc tải lên tệp');
            return;
        }
        const formData = new FormData();
        formData.append('problem_id', problemId);
        formData.append('language', language);
        if(file) {
            formData.append('file', file);
        } else {
            formData.append('code', code);
        }
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/submission/submit`, 
                formData, 
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )
        } catch (err) {
            setMsg('Lỗi khi nộp bài: ' + err.response?.data?.message || err.message);
            return;
        }
    };
    useEffect (() => {
            axios.get(`${process.env.REACT_APP_API_URL}/api/problem/${problemId}`)
            .then(res => {
                setProblemTitle(res.data.title);
            });
        }, [problemId]);
    return (
        <div className="submit-code">
            <h3>
                Nộp lời giải cho {" "}
                <Link to={`/problems/${problemId}`}>
                    {problemTitle || 'Bài tập'}
                </Link>
            </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ngôn ngữ:</label>
                    <select value={language} onChange={e => setLanguage(e.target.value)}>
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
                <div>
                    <label>Code:</label>
                    <textarea 
                        value={code} 
                        onChange={handleCodeChange} 
                        placeholder="Nhập code của bạn tại đây"
                        rows="10"
                    />
                </div>
                <div>
                    <label>Tải lên tệp:</label>
                    <input type="file" accept=".cpp,.py" onChange={handleFileChange} />
                </div>
                {msg && <div className="error">{msg}</div>}
                <button type="submit">Nộp bài</button>
                <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
            </form>
        </div>
    )
}