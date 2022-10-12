const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { sessionName, secret } = require('../config/appConfig');


const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {

    let token = req.cookies[sessionName];


    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
            res.locals.user = decodedToken;

        } catch (error) {
            console.log(error);
            res.redirect('/auth/login');
        }
    };

    next();
};


exports.isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('/not-found');
    }

    next();
};

exports.isGuest = (req, res, next) => {
    if(req.user){
        return res.redirect('/not-found');
    }

    next();
};