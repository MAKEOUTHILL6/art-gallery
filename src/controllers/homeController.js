const router = require('express').Router();
const profileServices = require('../services/profileServices');

router.get('/', (req, res) => {
    res.render('home');
});


router.get('/not-found', (req, res) => {
    res.render('404');
});


router.get('/profile/:id', async (req, res) => {
    
    let profile = await profileServices.getProfile(req.params.id);

    res.render('profile', {profile});
});


module.exports = router;