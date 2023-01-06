const user = require("../models/Users");
var CryptoJS = require("crypto-js");

const express = require('express');
const router = express.Router();

// Registration router
router.post('/register', async(req, res) => {
    const newUser = new user({
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



module.exports = router;