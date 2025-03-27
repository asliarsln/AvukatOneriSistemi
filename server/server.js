require("dotenv").config(); // .env dosyasındaki değişkenleri kullanmak için
const express = require("express"); // Express framework'ünü dahil ediyoruz
const cors = require("cors"); // CORS politikalarını yönetmek için
const mongoose = require("mongoose"); // MongoDB bağlantısı için mongoose
const mongoURI = process.env.MONGO_URI;

const app = express(); // Express uygulamasını oluşturuyoruz
const PORT = process.env.PORT || 5000; // Port numarasını belirliyoruz

// Middleware'ler (Veriyi işleyen ara katmanlar)
app.use(express.json()); // JSON formatındaki istekleri kabul et
app.use(cors()); // CORS izinlerini aç

mongoose
  .connect(mongoURI) // Gereksiz seçenekleri kaldırdık
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err);
    process.exit(1); // Hata olursa uygulamayı durdur
  });

// Basit bir test endpoint'i (API'nin çalıştığını görmek için)
app.get("/", (req, res) => {
  res.send("Backend çalışıyor!"); // Tarayıcıya veya Postman'e mesaj döndürür
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
});
