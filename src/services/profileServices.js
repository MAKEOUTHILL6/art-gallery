const { User } = require('../models/User');


exports.getProfile = (id) => User.findById(id);


// ONE WAT TO ADD POSTS TO USERCOLLECTION 
// exports.addUserPost = (userId, publicationId) => User.updateOne({_id: userId}, {$push: {postCollection: publicationId}});

exports.addPublication = async (userId, publicationId) => {
    const user = await User.findById(userId);

    user.postCollection.push(publicationId);
    await user.save();

    return user;
}