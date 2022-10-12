const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    postCollection: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication',
        }
    ],
});


const User = mongoose.model('User', userSchema);


exports.User = User;