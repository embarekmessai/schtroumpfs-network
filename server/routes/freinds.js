const User = require("../models/User");
const { auth } = require("./middlewares/auth");

const router = require("express").Router();

// Add new freind
router.post('/', auth, async (req, res) => {

    // get user id
    const id = req.body.id;

    // Get user freind id from request
    const resFreindId = req.body.freindId;

    // Get user with freind
    const user = await User.find({ _id: id }).populate({
        path: 'freinds',
        transform: freind => freind.id == resFreindId ? freind.id : null
    });

    // Filter freinds array to delete nulled values
    const filtredFreindId = user[0].freinds.filter(freind => freind !== null);

    // const freindId = user[0].freinds._id.valueOf(); // Get user freind id from database
    if (filtredFreindId.length > 0) {
        return res.status(401).json({ message: "Vous êtes déjà ami avec ce Schtroumpf" })
    }

    const freind = { freinds: req.body.freindId }; // Set body freindId to variable

    // Update user with new frend id
    User.findByIdAndUpdate(id, { $push: freind }, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        };

        if (!user) {
            // The user was not found
            return res.status(401).json({ message: "Cette ultilisateur n'existe pas" });
        };

        // Return response message
        return res.status(201).json({ message: "Ami ajouté avec succès!" });
    });


})

// Get all user freinds
router.get('/:id', auth, async (req, res) => {

    // Get user Id
    const id = req.params.id;

    const user = await User.findById(id).populate('freinds');

    console.log(user);

    if (!user) {
        // The user was not found
        return res.status(401).json({ message: "Cette ultilisateur n'existe pas" });
    };

    return res.status(201).json({ freinds: user.freinds });

})

// Delete freind from list
router.post('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const freindId = req.body.freindId;

    // Get auth user
    const user = await User.findById(id);

    // Create a promise to return a result from foreach
    function deleteFreindProcess(array) {
        return new Promise((resolve, reject) => {
            let result = false;
            array.forEach((el, index) => {
                if (el._id.valueOf() === freindId) {
                    array.splice(index, 1);
                    user.save();
                    result = true;
                }
            })
            if (result) {
                resolve(result);
            } else {
                reject("Ce Schtroumpf n'est pas votre ami")
            }
        });
    }

    // Delete Freind
    deleteFreindProcess(user.freinds)
        .then(() => {
            res.status(202).json({ message: "Schtroumpf Ami supprimé de votre liste" });
        })
        .catch(err => {
            res.status(202).json({ message: err })
        });


})

module.exports = router;