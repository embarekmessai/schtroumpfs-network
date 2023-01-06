const User = require("../models/User");
const { route } = require("./auth");
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

// Edit user role
router.put("/role", async(req, res) =>{
 try {
    const user = User.findById(req.body.user_id);

    const updateRole = user && await user.updateOne({role: req.body.role})

    const { password, ...others } = updateRole._doc

    res.status(201).json(others);

 } catch (error) {
    res.status(500).json(error);
 }
})

module.exports = router;