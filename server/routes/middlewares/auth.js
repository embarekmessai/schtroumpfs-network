const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
            // const token = req.cookies.auth; // Get auth cookie
            const authHeader = req.headers.authorization; // Get auth
            
            if(authHeader) {
                const token = authHeader.split(" ")[1];
                jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if(err){
                    return res.status(403).json("Le Token n'est pas valide!");
                }
                // Get user id from token
                req.token = token;
                req.user = user;
                next();

                });
            }

        } catch (error) {
            res.status(401).json("Vous n'êtes pas authentifier!");;
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