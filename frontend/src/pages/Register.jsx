import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      navigate('/login');
    } catch (err) {
      alert('Registrasi gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">
          <h1>Bergabung Yuk!</h1>
        </div>

        <h4>Daftarkan diri untuk mulai menemukan resep lezat</h4>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Buat username unik Anda"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Buat password yang kuat"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Mendaftarkan...' : '✦ Daftar Sekarang ✦'}
          </button>
        </form>

        <p className="auth-link">
          Sudah punya akun?{' '}
          <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;