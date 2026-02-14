import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setRecipe(res.data);
    };
    fetchDetail();
  }, [id]);

  if (!recipe) return (
    <div className="detail-wrapper">
      <div className="loading-screen">
        <div className="spinner" />
        <p>Sedang memuat resep...</p>
      </div>
    </div>
  );

  return (
    <div className="detail-wrapper">

      {/* Detail Hero */}
      <div className="detail-hero">
        <div className="container">
          <Link to="/" className="detail-back">
            ← Kembali ke Beranda
          </Link>
          <h2>{recipe.title}</h2>
          {recipe.category && (
            <span className="badge" style={{ marginTop: '12px' }}>🏷 {recipe.category}</span>
          )}
        </div>
      </div>
      <div className="batik-divider" />

      {/* Detail Body */}
      <div className="detail-body">
        <div className="container">

          {/* Video */}
          {recipe.videoUrl && (
            <div className="video-container">
              <iframe
                src={recipe.videoUrl}
                title="Tutorial Memasak"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}

          {/* Bahan-bahan */}
          <div className="recipe-section">
            <h3>🛒 Bahan-bahan</h3>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Langkah-langkah */}
          <div className="recipe-section">
            <h3>👩‍🍳 Langkah-langkah</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

        </div>
      </div>

      <footer className="home-footer">
        <p>✦ Rahasia Dapur PKK Nusantara · Masakan Penuh Kasih ✦</p>
      </footer>
    </div>
  );
};

export default RecipeDetail;