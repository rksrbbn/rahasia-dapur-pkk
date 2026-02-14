require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Terhubung ke MongoDB: rahasia_dapur'))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const RecipeSchema = new mongoose.Schema({
  title: String,
  category: String, // 'Rumahan' atau 'Jualan'
  imageUrl: String,
  videoUrl: String, // Link embed YouTube
  ingredients: [String],
  steps: [String]
});
const Recipe = mongoose.model('Recipe', RecipeSchema);

// --- ROUTES ---
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registrasi berhasil!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registrasi' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username atau Password Salah!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Username atau Password Salah!' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });

  } catch (error) {
    console.error("Error di sistem login:", error);
    res.status(500).json({ message: 'Error pada server saat login' });
  }
});

app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.get('/api/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));