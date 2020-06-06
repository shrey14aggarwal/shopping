//It checks whether we are authenticated or not
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{

    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    console.log("in middleware")
    console.log(token)

    //verify token
    jwt.verify(token, "secret_this_should_be_longer_key_since_it_is_jwt");
    next();
    


};