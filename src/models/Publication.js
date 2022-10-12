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
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    userShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

});

publicationSchema.path('artPicture').validate(function(){
    return this.artPicture?.startsWith('http' || 'https');
}, 'Image url should start with either https or http');

const Publication = mongoose.model('Publication', publicationSchema);


exports.Publication = Publication;