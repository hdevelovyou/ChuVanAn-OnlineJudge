import React, { useState } from 'react';
import axios from 'axios';

export default function AdminAddProblem({ onSuccess, onBack }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        input_format: '',
        output_format: '',
        sample_input: '',
        sample_output: '',
        time_limit: '1s',
        memory_limit: '256MB',
        type: ''
    });

    const [msg, setMsg] = useState('');

    const handleChange = e => setForm({
        ...form,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/problem/add`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMsg('Bài tập đã được đăng!');
            if(onSuccess) onSuccess();
        } catch (err) {
            setMsg(err.response?.data?.message || 'Lỗi khi đăng bài tập');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng bài tập mới</h2>
            <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} required />
            <input name="input_format" placeholder="Đầu vào" value={form.input_format} onChange={handleChange} required />
            <input name="output_format" placeholder="Đầu ra" value={form.output_format} onChange={handleChange} required />
            <textarea name="sample_input" placeholder="Ví dụ đầu vào" value={form.sample_input} onChange={handleChange} required />
            <textarea name="sample_output" placeholder="Ví dụ đầu ra" value={form.sample_output} onChange={handleChange} required />
            <input name="time_limit" placeholder="Giới hạn thời gian (vd: 1s)" value={form.time_limit} onChange={handleChange} />
            <input name="memory_limit" placeholder="Giới hạn bộ nhớ (vd: 256MB)" value={form.memory_limit} onChange={handleChange} />
            <input name="type" placeholder="Dạng bài tập" value={form.type} onChange={handleChange} required />
            <button type="submit">Đăng</button>
            <button type="button" onClick={onBack}>Quay lại</button>
            {msg && <div>{msg}</div>}
        </form>
    );
}