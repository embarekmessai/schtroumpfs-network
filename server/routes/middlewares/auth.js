const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.auth; // Get auth cookie
        // Get user id from token
        const verifyUser = jwt.verify(token, process.env.JWT_SEC);
        
        // Get user
        const user = await User.findById(verifyUser.id)
        
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        res.status(500).send(error);
    }
}

// Password confirmation
const passwordConfirmation = async(req, res, next) => {
    if(req.body.password == req.body.password_conformation){
        next()
    }else {
        res.status(403).json('Le mot de passe ne correspond pas à sa confirmation');
    }
}

module.exports = {auth, passwordConfirmation};