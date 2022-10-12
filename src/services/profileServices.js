const { User } = require('../models/User');


exports.getProfile = (id) => User.findById(id);