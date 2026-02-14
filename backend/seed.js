require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI; 

const RecipeSchema = new mongoose.Schema({
  title: String,
  category: String, 
  imageUrl: String,
  videoUrl: String, 
  ingredients: [String],
  steps: [String]
});
const Recipe = mongoose.model('Recipe', RecipeSchema);

const seedRecipes = [
  {
    title: "Ayam Geprek Sambal Bawang Spesial",
    category: "Jualan",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
    videoUrl: "https://www.youtube.com/embed/aqOBfBK9avQ",
    ingredients: [
      "500g Daging ayam fillet",
      "Tepung bumbu serbaguna",
      "15 buah cabai rawit merah",
      "5 siung bawang putih",
      "Garam dan kaldu jamur secukupnya",
      "Minyak panas"
    ],
    steps: [
      "Cuci bersih ayam, baluri dengan tepung bumbu basah lalu tepung kering.",
      "Goreng ayam dalam minyak panas hingga kuning keemasan dan krispi. Tiriskan.",
      "Ulek kasar cabai rawit, bawang putih, garam, dan kaldu jamur.",
      "Siram sambal yang sudah diulek dengan 3 sendok makan minyak panas sisa menggoreng ayam.",
      "Letakkan ayam di atas cobek, lalu geprek bersama sambal hingga meresap."
    ]
  },
  {
    title: "Sayur Sop Bening Mba Asri",
    category: "Rumahan",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
    videoUrl: "", 
    ingredients: [
      "2 buah wortel, potong bulat",
      "1/4 kubis, potong kasar",
      "1 batang daun bawang & seledri",
      "3 siung bawang putih, geprek",
      "Kaldu ayam secukupnya",
      "Air secukupnya"
    ],
    steps: [
      "Rebus air hingga mendidih, masukkan bawang putih geprek.",
      "Tambahkan wortel, rebus hingga setengah empuk.",
      "Masukkan kubis, daun bawang, dan seledri.",
      "Tambahkan garam, merica, dan kaldu ayam secukupnya. Koreksi rasa.",
      "Angkat dan sajikan selagi hangat."
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Terhubung ke MongoDB: rahasia_dapur');

    await Recipe.deleteMany({});
    console.log('Data resep lama berhasil dibersihkan.');

    await Recipe.insertMany(seedRecipes);
    console.log('Seed data resep berhasil ditambahkan!');

  } catch (error) {
    console.error('Terjadi kesalahan saat seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('Koneksi database ditutup.');
  }
};

seedDB();