const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const express = require('express');
const router = express.Router();

// Registration router
router.post('/register', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save();
        const { password, ...others } = savedUser._doc

        res.status(201).json(others);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json(err);
    }
});

// Login router
router.post('/login', async(req, res) => {
    try {
        const user = req.body.username ? await User.findOne({username: req.body.username}).select('+password'): null;

        // IF Credentials wrongs
        !user && res.status(401).json("Votre nom d'utlisateur n'est pas enregitré");

        // Get Hashed Passowrd
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // Get input password
        const inputPassword = req.body.password;

        originalPassword != inputPassword && res.status(401).json("Mot de passe n'est pas correcte");

        
        // Define access Token
        const accessToken = jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.JWT_SEC, { expiresIn: "1h" }
        );
        
        // Save token in database
        user.token = accessToken;
        user.save();

        const { password, token, ...others } = user._doc // Hide password & token from response

        // Create new token cookie
        res.cookie('auth',user.token).json({...others, accessToken });

        // res.status(200).json({...others, accessToken });
                
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json(error);
    }
})

// Logout route
router.post('/logout', async(req, res) => {
    const authHeader = req.headers.authorization;
    
})


module.exports = router;