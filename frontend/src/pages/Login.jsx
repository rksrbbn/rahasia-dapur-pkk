import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal terhubung ke server";
      alert(`Login gagal: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">🍳</span>
          <h1>Rahasia Dapur</h1>
        </div>

        <h4>Masuk untuk menjelajahi koleksi resep pilihan</h4>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Masukkan username Anda"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Memuat...' : '✦ Masuk ✦'}
          </button>
        </form>

        <p className="auth-link">
          Belum punya akun?{' '}
          <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;