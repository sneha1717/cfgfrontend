require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

/*
 * API routes
 */
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const hungerRoutes = require('./routes/hungerSpots');
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/hunger-spots', hungerRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
