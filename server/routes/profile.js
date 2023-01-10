const router = require("express").Router();

const fs = require('fs');
const User = require('../models/User');
const { auth } = require('./middlewares/auth');
const path = require('path');
const CryptoJS = require("crypto-js");

// Get profile datas
router.get('/:id', auth, async(req, res) => {
    // Get relos
    const smurfsRolesPath = path.basename('schtroumpfs.json');

    const smurfsRoles = fs.readFileSync(smurfsRolesPath, 'utf-8');

    // Parse the file content as JSON
    const roles = JSON.parse(smurfsRoles);
    const user = await User.findById(req.params.id)

    // Chack if user exists
    if(!user){
        return res.status(500).json("Ultilisateur n'existe pas")
    }

    // return datas
    res.status(200).json({roles, user});

});

// Edit profile datas
router.put('/:id', auth, async(req, res) =>{

    const id = req.params.id;

    const user = await User.findById(id, 'password').exec();
    
    if(!user) {
        return res.status(400).json({ message: "Ultilisateur n'existe pas" });
    };


    // Check unique username
    if(req.body.username) {
        const user_name = req.body.username;

        const found_user = await User.findOne({ username : user_name })

        if(found_user) {
            return res.status(400).json({message: "Le nome d'utilisateur est déjà utilisé!"});
        }

    }

    // Changing old password
    if(req.body.password){
       
        const user_password = user.password;
        
        // Get Hashed Passowrd
        const hashedPassword = CryptoJS.AES.decrypt(
            user_password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(req.body.old_password) {

            // Check old password matching 
            if(req.body.old_password != originalPassword){
                return res.status(401).json({message : "L'ancient mot de passe n'est pas valide"});
            }
            
            // Check confiramation password matching 
            if(req.body.password !== req.body.password_conformation){
                res.status(403).json({message : 'Le mot de passe ne correspond pas à sa confirmation'});
            }
            
        } else {
            return res.status(401).json({message : "Vous devez saisir l'ancient mot de passe"});
        }
        
    }

    // Get all body datas    
    const updatedDatas = req.body;

    // Update profile using findByIdAndUpdate method
    User.findByIdAndUpdate(id, updatedDatas, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
    
        if (!user) {
            // The user was not found
            return res.status(401).json({ message: "Ultilisateur n'existe pas" });
        }
    
        // Return the updated user data to the client
        return res.status(302).json({user, message : "Porfile mise à jour avec succès!"});
    });
});


module.exports = router;