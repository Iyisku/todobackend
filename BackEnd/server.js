//imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express(); 
const todoRoutes = require('./Routes/todoRoutes');
const authRoutes = require('./Routes/authRoutes');
const { createServer } = require('@vercel/node'); // Needed for Vercel compatibility

// .env configurations
dotenv.config();

// Middlewares 
app.use(cors());
app.use(express.json());

//PORT From .env File or 9000
const PORT = process.env.PORT || 9000;

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);


//Connecting mongoose and Running Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });

  module.exports = createServer(app);