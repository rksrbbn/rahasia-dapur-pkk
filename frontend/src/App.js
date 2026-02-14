import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';

// Proteksi Route: Cek apakah user sudah login
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/recipe/:id" element={
          <PrivateRoute>
            <RecipeDetail />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;