const router = require("express").Router();

const fs = require('fs');
const User = require('../models/User');
const { auth } = require('./middlewares/auth');
const path = require('path');

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


module.exports = router;