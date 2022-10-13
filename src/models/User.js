const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    postCollection: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication',
        }
    ],
    shares: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication',
        }
    ]
});


const User = mongoose.model('User', userSchema);

exports.User = User;