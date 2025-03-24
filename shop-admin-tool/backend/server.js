const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB bağlantısı
mongoose.connect("mongodb://localhost:27017/userApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB'ye başarıyla bağlanıldı");
}).catch(err => {
    console.error("MongoDB bağlantı hatası:", err);
});

// Kullanıcı şeması ve modeli
const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    role: String
});
const User = mongoose.model("User", UserSchema);

// Kullanıcıları getiren API
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

// Yeni kullanıcı ekleyen API
app.post("/api/users", async (req, res) => {
    const { name, surname, email, role } = req.body;
    const newUser = new User({ name, surname, email, role });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

// Kullanıcıyı güncelleyen API
app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, surname, email, role }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

// Kullanıcıyı silen API
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: "Kullanıcı başarıyla silindi" });
    } catch (err) {
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));