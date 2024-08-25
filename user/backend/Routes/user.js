const express = require('express'); 
const bcrypt = require('bcrypt'); // Importing bcrypt for hashing passwords
const User = require('../Models/User'); 
const router = express.Router(); 

// Route to handle user creation (POST request)
router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body); // Log request body for debugging purposes

    const plainPassword = req.body.password; // Extract plain password from request body
    const hashedPassword = await bcrypt.hash(plainPassword, 12); // Hashes password 

    // Creates new User object with provided data, replacing plain password with hashed password
    const newUser = new User({ 
      ...req.body, 
      password: hashedPassword, 
      plainPassword: plainPassword // Store plain password for login use
    });

    const savedUser = await newUser.save(); // Save new user to database
    res.status(201).json(savedUser); // Send a response with status 201 (Created) and  saved user data
  } catch (err) {
    res.status(400).json({ error: err.message }); // Send a response with status 400 (Bad Request) and error message if an error occurs
  }
});

// Handle fetching all users (GET request)
router.get('/', async (req, res) => {
  try {
    // Find all users in database and exclude password fields from response
    const users = await User.find().select('-password -plainPassword'); 
    res.status(200).json(users); // Sends response with status 200 (OK) and the list of users
  } catch (err) {
    res.status(400).json({ error: err.message }); // Sends a response with status 400 (Bad Request) and error message if an error occurs
  }
});

// Route to handle updating a user by ID (PUT request)
router.put('/:id', async (req, res) => {
  try {
    const updatedUserData = { ...req.body }; // Extract data to update

    // If a new password is provided, hash it and add it to updated user data
    if (req.body.password) {
      const plainPassword = req.body.password;
      updatedUserData.password = await bcrypt.hash(plainPassword, 12);
      updatedUserData.plainPassword = plainPassword; // Stores plain password for future use (not recommended for production)
    }

    // Updates user with specified ID and exclude password fields from response
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUserData, { new: true }).select('-password -plainPassword'); 
    res.status(200).json(updatedUser); // Sends response with status 200 (OK) and updated user data
  } catch (err) {
    res.status(400).json({ error: err.message }); // Sends response with status 400 (Bad Request) and error message if an error occurs
  }
});

module.exports = router; 
