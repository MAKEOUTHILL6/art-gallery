const {Publication} = require('../models/Publication');
const { User } = require('../models/User');


exports.getPublication = (id) => Publication.findById(id);
exports.getPublicationDetailed = (id) => Publication.findById(id).populate('author');
exports.updatePublication = (id, data, options) => Publication.findByIdAndUpdate(id, data, options);
exports.createPublication = (data) => Publication.create(data);
exports.deletePublication = (id) => Publication.findByIdAndDelete(id);
                                    // Publication.findOne({_id: id})
exports.getAllPublications = () => Publication.find();