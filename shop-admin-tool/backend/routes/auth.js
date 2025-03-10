const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Kullanıcı Kayıt
router.post("/register", async (req, res) => {
  const { name, surname, email, password, jobTitle } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, surname, email, password: hashedPassword, jobTitle });
    await newUser.save();
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!" });
  } catch (error) {
    res.status(500).json({ error: "Kayıt sırasında hata oluştu!" });
  }
});

// Kullanıcı Giriş (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Kullanıcı bulunamadı!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Şifre yanlış!" });
    }

    const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ error: "Bu email adresi zaten kayıtlı!" });
}


    const token = jwt.sign({ id: user._id, role: user.role }, "GIZLI_JWT_SECRET", { expiresIn: "1h" });

    res.json({ message: "Giriş başarılı!", token });
  } catch (error) {
    res.status(500).json({ error: "Giriş sırasında hata oluştu!" });
  }
});

module.exports = router;
