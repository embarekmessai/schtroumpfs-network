const User = require("../models/User");
const router = require("express").Router();

//GET ALL USER
router.get("/", async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;