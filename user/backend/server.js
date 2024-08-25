const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://LetsArcMedia:ck2BRsv5h0FvCwcm@letsarcmediadb.nhwlq0u.mongodb.net/?retryWrites=true&w=majority&appName=LetsArcMediaDB', {
  useNewUrlParser: true, // Use the new URL parser for MongoDB connection
  useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
}).then(() => {
  console.log('Connected to MongoDB'); // Logs success message once connected
}).catch(err => {
  console.error('Error connecting to MongoDB', err); // Logs error message if connection fails
});

// Import and use user routes
const userRoutes = require('./Routes/user'); // Import user route handlers
app.use('/api/users', userRoutes); // Uses user routes for paths starting with /api/users

// Starts server
const PORT = 5007; // Defines port to listen on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Logs a message indicating server is running
});