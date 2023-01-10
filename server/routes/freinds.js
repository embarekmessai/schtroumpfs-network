const User = require("../models/User");
const { auth } = require("./middlewares/auth");

const router = require("express").Router();

// Add new freind
router.post('/freinds', auth, async(req, res) => {
    
    // get user id
    const id = req.body.id;
    
    const freind = {
        freinds : req.body.freindId,
    };

    // Update user with new frend id
    User.findByIdAndUpdate(id, freind, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        };
    
        if (!user) {
            // The user was not found
            return res.status(401).json({ message: "Cette ultilisateur n'existe pas" });
        };

        // Return response message
        return res.status(201).json({message : "Ami ajouté avec succès!"});
    }); 


})

module.exports = router;