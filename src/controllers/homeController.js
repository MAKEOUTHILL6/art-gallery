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
    
    let profile = await profileServices.getProfile(req.params.id).lean();

    res.render('profile', {profile});
});


module.exports = router;