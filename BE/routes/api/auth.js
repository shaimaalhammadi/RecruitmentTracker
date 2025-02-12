const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const jwtSecret = process.env.SECRET_KEY;

// @route   GET api/auth
// @desc    Get user details from token in headers
// access   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Login API
// access   Public
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if admin user or not
        // if (email !== 'admin@adfca.gov.ae') {
        //     return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        // }

        // user exists check
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors: [{msg: 'User not found'}] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Password'}] });
        }

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
        jwt.sign(payload, jwtSecret, {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/auth
// @desc    Reset user password
// access   Public
router.post('/resetpassword', async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
        try {

        // check if admin user or not
        // if (email !== 'admin@adfca.gov.ae') {
        //     return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        // }

        // user exists check
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors: [{msg: 'User not found'}] });
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({ errors: [{msg: 'Password Mismatch Error'}] });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Password'}] });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const newpass = await bcrypt.hash(newPassword, salt);
            const record = await User.findByIdAndUpdate( user.id, { password: newpass } );
            res.send(`Updated ${record}`);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error Occurred");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;