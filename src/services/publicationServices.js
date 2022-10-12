const {Publication} = require('../models/Publication');


exports.getPublication = (id) => Publication.findById(id);