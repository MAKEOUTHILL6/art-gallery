const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {saltRounds, secret} = require('../config/appConfig');


exports.register = async ({username, password, rePassword}) => {
    if(password !== rePassword){
        return false;
    };

    let isRegistered = await User.findOne({username});
    if(isRegistered.username){
        throw {
            message: 'Username already registered',
        };
    };


    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = User.create({
        username,
        password: hashedPassword,
    });

    return createdUser;
};


exports.login = async ({username, password}) => {
    let user = await User.findOne({username});

    console.log(user);

    if(!user){
        return false;
    };

    let isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw {
            message: 'Invalid username or password',
        };
    };


    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, {expiresIn: '2d'}, (err, token) => {
            if(err){
                return reject(err);
            };

            resolve(token);
        });
    });

    return result;

};