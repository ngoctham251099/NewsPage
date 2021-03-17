require("dotenv").config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports.auth = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(500).json({auth: false, message: 'No token provided!'})
    }
    jwt.verify(token, SECRET_KEY, (err, user)=> {
        if(err){
            return res.status(500).json({auth: false, message: "Failed  to authenticate token!!!"})
        }
        console.log(user);
        res.json({auth: true, token: token, user: user});
        next();
    })
}