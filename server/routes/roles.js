const Role = require("../models/Role");
const auth = require("./middlewares/auth");
const router = require("express").Router();

// Get all roles
router.get('/', auth, async(req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Add new role
router.post('/roles', auth, async(req, res)=>{
    try {
        const newRole = new Role({
            name: req.body.name
        });

        await newRole.save();

        res.status(201).json('Le role a été créé avec succès!');
        
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json(error);
    }
})