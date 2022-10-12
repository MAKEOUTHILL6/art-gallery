const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {saltRounds, secret} = require('../config/appConfig');


exports.register = async ({username, password, rePassword, streetAddress}) => {
    if(password !== rePassword){
        throw {
            message: 'Password mismatch!',
        };
    };

    let isRegistered = await User.findOne({username}) || false;
    if(isRegistered.username){
        throw {
            message: 'Username already registered',
        };
    };
 

    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = User.create({
        username,
        password: hashedPassword,
        streetAddress,
    });

    return createdUser;
};


exports.login = async ({username, password}) => {
    let user = await User.findOne({username});

    if(!user){
        throw {
            message: 'No such username',
        };
    };

    let isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw {
            message: 'Invalid username or password',
        };
    };


    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username, streetAddress: user.streetAddress }, secret, {expiresIn: '2d'}, (err, token) => {
            if(err){
                return reject(err);
            };

            resolve(token);
        });
    });

    return result;

};