const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlewares');
const {Publication} = require('../models/Publication');
const {User} = require('../models/User');
const publicationServices = require('../services/publicationServices');
const profileServices = require('../services/profileServices');

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


router.get('/details/:id', async (req, res) => {
    
    let publication = await publicationServices.getPublication(req.params.id).lean();

    let user = await profileServices.getProfile(publication.author).lean();

    const isOwner = publication.author == req.user?._id;

    res.render('details', {publication, username: user.username, isOwner});
});


router.get('/edit/:id', isAuth, async (req, res) => {

    let publication = await publicationServices.getPublication(req.params.id).lean();

    res.render('edit', {publication});
});


router.post('/edit/:id', isAuth, async (req, res) => {
    let data = req.body;

    await Publication.findByIdAndUpdate(req.params.id, data, {runValidators: true});

    res.redirect(`/publication/details/${req.params.id}`);
});


router.get('/gallery', async (req, res) => {

    const publications = await Publication.find().lean();

    res.render('gallery', {publications});
});

module.exports = router;