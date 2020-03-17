const jwt = require("jsonwebtoken");

// Secret Key
const secret = "everyAppRequiresASecretKeyAndThisIsMyAppSecretKey";
module.exports.secret = secret;

// Authenticate
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}