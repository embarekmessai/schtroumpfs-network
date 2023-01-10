const User = require("../models/User");
const { auth } = require("./middlewares/auth");

const router = require("express").Router();

router.get('/:id', auth, async(req, res) => {

    // get id
    const id = req.params.id;

    // Get count of all smurfs
    const schtroumps = await User.count();

    const user = await User.findById(id);

    const amis = 0;

    if(user.freinds){
        amis = Object.keys(user.freinds).length;
    } 


    return res.status(200).json({schtroumps: schtroumps, amis: amis})
})

module.exports = router;