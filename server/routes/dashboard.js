const User = require("../models/User");
const { auth } = require("./middlewares/auth");

const router = require("express").Router();

router.get('/:id', auth, async(req, res) => {

    // get id
    const id = req.params.id;

    // Get count of all smurfs
    const schtroumpfs = await User.count();

    const user = await User.findById(id).populate({
                            path: 'freinds', 
                            transform: freind => freind.id
                        });
    
    const amisCount = user.freinds.length;

    return res.status(200).json({schtroumpfs: schtroumpfs, amis: amisCount})
})

module.exports = router;