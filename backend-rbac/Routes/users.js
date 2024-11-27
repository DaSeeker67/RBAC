const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = express.Router();

// @route GET /api/users
// @desc Get all users
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route DELETE /api/users/:id
// @desc Delete a user
router.delete('/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        // Destructure the fields to update from the request body
        const { name, role, status } = req.body;

        // Create an update object with only the provided fields
        const updateFields = {};
        if (name) updateFields.name = name;
        if (role) updateFields.role = role;
        if (status) updateFields.status = status;

        // Find the user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: updateFields }, 
            { new: true, runValidators: true } 
        ).select('-password'); 

        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        
        // Handle specific validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        res.status(500).send('Server error');
    }
});



module.exports = router;
