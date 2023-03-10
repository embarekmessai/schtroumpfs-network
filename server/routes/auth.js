const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const express = require('express');
const router = express.Router();

const { auth } = require('./middlewares/auth')
const { passwordConfirmation } = require('./middlewares/auth')

// Registration router
router.post('/register', passwordConfirmation ,  async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save();

        // Define access Token
        const accessToken = jwt.sign({
            id: savedUser._id,
            role: savedUser.role
        },
        process.env.JWT_SEC, { expiresIn: "1h" }
        );
        
        // Save token in database
        savedUser.token = accessToken;
        savedUser.save();

        const { password, createdAt, updatedAt, token, ...others } = savedUser._doc

        // Send response with data & access token
        res.status(200).json({...others, accessToken });

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
        if(!user){
            return res.status(403).json({massage : "Votre nom d'utlisateur n'est pas enregitré"});
        } 
        
        // Avoid null password
        if(!req.body.password){
            return res.status(403).json({massage : "Vous devez saisir un mot de passe"});

        }

        // Get Hashed Passowrd
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // Get input password
        const inputPassword = req.body.password;

         
        if(originalPassword != inputPassword) {
            return res.status(403).json({massage : "Mot de passe n'est pas correcte"});
        }
        
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

        const { password, token, createdAt, updatedAt, ...others } = user._doc // Hide password & token from response

        // Send response with data & access token
        res.status(200).json({...others, accessToken });

        // res.status(200).json({...others, accessToken });
                
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json(error);
    }
})

// Logout route
router.post('/logout', auth, async(req, res) => {

    res.status(200).json({massage : "Vous êtes déconnecté!"});
    
    // Change user token
    const user = await User.findById(req.user.id)
    user.token = '1';
    user.save();
})


module.exports = router;