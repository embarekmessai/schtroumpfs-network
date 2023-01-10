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

    const user = await User.findById(id, 'username password').exec();
    
    if(!user) {
        return res.status(400).json({ message: "Ultilisateur n'existe pas" });
    };


    const user_name = req.body.username;
    // Check unique username
    if(user_name) {

        // Skipping user username
        if(user.username !== user_name){
            const found_user = await User.findOne({ username : user_name })

            if(found_user) {
                return res.status(400).json({message: "Le nome d'utilisateur est déjà utilisé!"});
            }
        }

    }

    const user_password = user.password;

    // Changing old password
    if(req.body.password){
       
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
            if(req.body.password != req.body.password_conformation){
                return res.status(401).json({message : 'Le mot de passe ne correspond pas à sa confirmation'});
            }
            
        } else {
            return res.status(401).json({message : "Vous devez saisir l'ancient mot de passe"});
        }
        
    }

    // Get all body datas    
    const updatedDatas = {
        username: user_name,
        fullname: req.body.fullname,
        password: req.body.password ? CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString() : user_password,
        role: {
            name: req.body.role,
            image: req.body.image,
            avatar: req.body.avatar,
        },
    };


    // Update profile using findByIdAndUpdate method
    User.findByIdAndUpdate(id, updatedDatas, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
    
        if (!user) {
            // The user was not found
            return res.status(401).json({ message: "Ultilisateur n'existe pas" });
        }

        const { password, createdAt, updatedAt, token, ...others } = user._doc
    
        // Return the updated user data to the client
        return res.status(201).json({...others, message : "Porfile mise à jour avec succès!"});
    });
});


module.exports = router;