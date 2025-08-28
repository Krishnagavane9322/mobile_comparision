const dotenv = require('dotenv');
dotenv.config({ path: './mobile-recommendation-backend/.env' });
const connectDB = require('./mobile-recommendation-backend/config/db');
const mongoose = require('mongoose');
const Mobile = require('./mobile-recommendation-backend/models/mobile');

const mobiles = [
  {
    name: "iPhone 14 Pro",
    brand: "Apple",
    model: "iPhone 14 Pro",
    price: 999,
    ram: 6,
    storage: 128,
    screenSize: 6.1,
    battery: 3200,
    camera: 48,
    processor: "A16 Bionic",
    rating: 4.8
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    model: "Galaxy S23 Ultra",
    price: 1199,
    ram: 12,
    storage: 256,
    screenSize: 6.8,
    battery: 5000,
    camera: 200,
    processor: "Snapdragon 8 Gen 2",
    rating: 4.9
  },
  {
    name: "OnePlus 11",
    brand: "OnePlus",
    model: "OnePlus 11",
    price: 699,
    ram: 8,
    storage: 128,
    screenSize: 6.7,
    battery: 5000,
    camera: 50,
    processor: "Snapdragon 8 Gen 2",
    rating: 4.6
  },
  {
    name: "Google Pixel 7 Pro",
    brand: "Google",
    model: "Pixel 7 Pro",
    price: 899,
    ram: 12,
    storage: 128,
    screenSize: 6.7,
    battery: 5000,
    camera: 50,
    processor: "Google Tensor G2",
    rating: 4.7
  },
  {
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    model: "13 Pro",
    price: 999,
    ram: 12,
    storage: 256,
    screenSize: 6.73,
    battery: 4820,
    camera: 50,
    processor: "Snapdragon 8 Gen 2",
    rating: 4.5
  },
  {
    name: "Nothing Phone (1)",
    brand: "Nothing",
    model: "Phone (1)",
    price: 399,
    ram: 8,
    storage: 128,
    screenSize: 6.55,
    battery: 4500,
    camera: 50,
    processor: "Snapdragon 778G+",
    rating: 4.3
  },
  {
    name: "Motorola Edge 40",
    brand: "Motorola",
    model: "Edge 40",
    price: 599,
    ram: 8,
    storage: 256,
    screenSize: 6.55,
    battery: 4400,
    camera: 50,
    processor: "MediaTek Dimensity 8020",
    rating: 4.4
  },
  {
    name: "Realme GT Neo 3",
    brand: "Realme",
    model: "GT Neo 3",
    price: 449,
    ram: 8,
    storage: 128,
    screenSize: 6.7,
    battery: 5000,
    camera: 50,
    processor: "MediaTek Dimensity 8100",
    rating: 4.2
  }
];

(
  async () => {
    try {
      await connectDB();
      await Mobile.deleteMany();
      await Mobile.insertMany(mobiles);
      console.log("✅ Mobile data inserted successfully!");
      console.log(`📱 Added ${mobiles.length} mobile phones to the database`);
    } catch (err) {
      console.error("❌ Error inserting mobile data:", err);
    } finally {
      await mongoose.connection.close();
      process.exit(0);
    }
  }
)();
