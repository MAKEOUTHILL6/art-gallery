const mongoose = require('mongoose');


const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    paintingTech: {
        type: String,
        required: true,
    },
    artPicture: {
        type: String,
        required: true,
    },
    certificate: [{
        key: yes,
        value: yes
    }, {
        key: no,
        value: no
    }],
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    userShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

});

const Publication = mongoose.model('Publication', publicationSchema);


exports.Publication = Publication;