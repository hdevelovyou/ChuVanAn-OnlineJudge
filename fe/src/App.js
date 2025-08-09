import './App.css';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5'
    }}>
      <div style={{
        padding: '40px 60px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <h1>Chào mừng đến với ChuVanAn-OnlineJudge!</h1>
        <p>Trang web chấm bài tự động dành cho học sinh chuyên Chu Văn An.</p>
        <Register />
        <Login />
      </div>
    </div>
  );
}

export default App;
