const router = require('express').Router();
const profileServices = require('../services/profileServices');
const publicationServices = require('../services/publicationServices');

router.get('/', async (req, res) => {

    let publications = await publicationServices.getAllPublications().lean();

    res.render('home', {publications});
});


router.get('/not-found', (req, res) => {
    res.render('404');
});


router.get('/profile/:id', async (req, res) => {

    const profile = await profileServices.getProfile(req.params.id).populate('postCollection').populate('shares').lean();

    const publicationTitles = profile.postCollection.map(x => x.title).join(', ');
    const sharedTitles = profile.shares.map(x => x.title).join(', ');

    // ONE WAY TO GET THE PUBLICATIONS WHICH BELONG TO THE USER BUT ITS VERY SLOW () INSTEAD WE DO IT IN THE PUBLICATION CREATE
    // const userPublications = Publication.find({author: profile._id});

    res.render('profile', {profile, publicationTitles, sharedTitles});
});


module.exports = router;