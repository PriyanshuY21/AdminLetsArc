const express = require('express');
const bcrypt = require('bcrypt'); 
const User = require('../Models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    
    const newUser = new User({ 
      ...req.body, 
      password: hashedPassword, 
      plainPassword: plainPassword 
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password -plainPassword'); 
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUserData = { ...req.body };

    if (req.body.password) {
      const plainPassword = req.body.password;
      updatedUserData.password = await bcrypt.hash(plainPassword, 12);
      updatedUserData.plainPassword = plainPassword; 
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUserData, { new: true }).select('-password -plainPassword'); 
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
