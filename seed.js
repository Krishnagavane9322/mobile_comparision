const dotenv = require('dotenv');
dotenv.config({ path: './mobile-recommendation-backend/.env' });
const connectDB = require('./mobile-recommendation-backend/config/db');
const mongoose = require('mongoose');
const Mobile = require('./mobile-recommendation-backend/models/mobile');
const mobiles = [
  {
    name: "iPhone 14 Pro",
    brand: "Apple",
    price: 999,
    ram: 6,
    storage: 128,
    battery: 3200,
    camera: 48,
    processor: "A16 Bionic",
    rating: 4.8
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    price: 1199,
    ram: 12,
    storage: 256,
    battery: 5000,
    camera: 200,
    processor: "Snapdragon 8 Gen 2",
    rating: 4.9
  },
  {
    name: "OnePlus 11",
    brand: "OnePlus",
    price: 699,
    ram: 8,
    storage: 128,
    battery: 5000,
    camera: 50,
    processor: "Snapdragon 8 Gen 2",
    rating: 4.6
  }
  // ➕ add more mobiles here
];

(
  async () => {
    try {
      await connectDB();
      await Mobile.deleteMany();
      await Mobile.insertMany(mobiles);
      console.log("✅ Mobile data inserted!");
    } catch (err) {
      console.error(err);
    } finally {
      await mongoose.connection.close();
      process.exit(0);
    }
  }
)();
