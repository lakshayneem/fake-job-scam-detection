const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const secretKey = "mySecret"
router.post('/signup',async (req,res)=>{
    const { name, mail, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ mail });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        user = new User({ name, mail, password: hashedPassword });
        await user.save();

        // Generate token
        const token = jwt.sign({ id: user.id },secretKey);

        res.status(201).json({ message: "User registered successfully", token : token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})




module.exports = router;