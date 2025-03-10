const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth"); // auth.js'i dahil et

const app = express();

app.use(express.json()); // JSON verilerini okumak için gerekli
app.use(cors());

// Auth rotalarını ekle
app.use("/api/auth", authRoutes);

// Server başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor...`));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch((err) => console.log("MongoDB bağlantısı hatası: ", err));
