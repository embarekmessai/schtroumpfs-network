const User = require("../models/User");
const { auth } = require("./middlewares/auth");

const router = require("express").Router();

router.get('/:id', auth, async(req, res) => {
    try {
        // Get auth user id
        const id = req.params.id;
    
        // Get auth user
        const user = await User.findById(id).populate('freinds', '-token -createdAt -updatedAt');
    
        // Check if user loaded 
        if(!user) {
            return res.status(400).json({message: "Une erreur est survenue!"})
        }
        
        // Get all users
        const users = await User.find().select('-token -createdAt -updatedAt');
        
        // Check if users loaded 
        if(!users) {
            return res.status(400).json({message: "Une erreur est survenue!"})
        }

        res.status(200).json({users: users, freinds: user.freinds});
        
    } catch (error) {
        res.status(500).json(error);
    }




})

module.exports = router;