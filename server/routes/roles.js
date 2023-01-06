const Role = require("../models/Role");
const router = require("express").Router();

// Get all roles
router.get('/', async(req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json(err);
    }
})
