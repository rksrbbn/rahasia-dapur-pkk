import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get('http://localhost:5000/api/recipes');
      setRecipes(res.data);
    };
    fetchRecipes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-emblem">🍳</div>
          <div>
            <h2>Rahasia Dapur</h2>
            <small>Koleksi Resep PKK</small>
          </div>
        </div>
        <button className="btn-secondary" onClick={handleLogout}>
        Keluar
        </button>
      </header>

      {/* Hero Section */}
      <div className="home-hero">
        <h1>
          Resep <span>Lezat</span> &<br />Penuh Cinta
        </h1>
      </div>

      {/* Recipe Grid */}
      <div className="container">
        <div className="section-header">
          <h2>🍽 Daftar Resep</h2>
        </div>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-img-wrapper">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="recipe-img"
                />
              </div>
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <span className="badge">🏷 {recipe.category}</span>
                <div className="recipe-card-footer">
                  <Link to={`/recipe/${recipe._id}`}>
                    <button className="btn-primary">Lihat Resep →</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>Rahasia Dapur PKK by Raka Santang Rabbani</p>
      </footer>
    </div>
  );
};

export default Home;