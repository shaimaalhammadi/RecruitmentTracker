const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.SECRET_KEY;

// @route   Post api/users
// @desc    Register User
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if(!(email || email.length > 0)) {
            return res.status(400).json({
                error: 'Bad request'
            });
        }
        let user = await User.findOne({ email })
        if (user) {
            return res.status(200).json({
                error: 'User already Exist'
            });
        }
        user = new User({
            name,
            email,
            password,
            role,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
        jwt.sign(payload, jwtSecret, {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;