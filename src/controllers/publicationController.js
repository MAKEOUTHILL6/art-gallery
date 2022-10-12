const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlewares');
const {Publication} = require('../models/Publication');
const {User} = require('../models/User');

router.get('/create', (req, res) => {

    res.render('create');
});


router.post('/create', isAuth, async (req, res) => {

    const publication = req.body;
    
    let user = await User.findById(req.user._id);
    user.postCollection.push(publication)
    await user.save();

    publication.author = req.user._id;
    
    await Publication.create(publication)

    res.redirect('/publication/gallery');

});


router.get('/gallery', async (req, res) => {

    const publications = await Publication.find().lean();

    res.render('gallery', {publications});
});

module.exports = router;