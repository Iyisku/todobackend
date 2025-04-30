//imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express(); 
const todoRoutes = require('./Routes/todoRoutes');
const authRoutes = require('./Routes/authRoutes');


// .env configurations
dotenv.config();

// Middlewares 
app.use(cors({
  origin: ['https://todo-assignment-kappa-gilt.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

//PORT From .env File or 9000
const PORT = process.env.PORT || 9000;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable buffering - important for serverless
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);


//Connecting mongoose and Running Server
mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });

module.exports = app; 