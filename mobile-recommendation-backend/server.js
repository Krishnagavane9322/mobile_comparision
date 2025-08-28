const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check routes
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});
app.get('/api/mobiles/test', (req, res) => {
  res.send('✅ Mobile routes are working!');
});

// Feature routes
const mobileRoutes = require('./routes/mobileroutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/mobiles', mobileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();