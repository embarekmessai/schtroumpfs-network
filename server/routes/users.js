const User = require("../models/User");
const { auth } = require("./middlewares/auth");
const router = require("express").Router();

//GET ALL USER
router.get("/", auth, async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit user role
router.put("/role", auth, async(req, res) =>{
 try {
    const user = User.findById(req.user._id);

    const updateRole = user && await user.updateOne({role: req.body.role})

    const { password, token, ...others } = updateRole._doc

    res.status(201).json(others);

 } catch (error) {
    res.status(500).json(error);
 }
})

module.exports = router;