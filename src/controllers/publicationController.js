const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlewares');
const {Publication} = require('../models/Publication');

router.get('/create', (req, res) => {

    res.render('create');
});


router.post('/create', isAuth, async (req, res) => {

    const publication = req.body;
    publication.author = req.user._id;
    
    await Publication.create(publication)

    res.redirect('/');

    // REDIRECT TO GALLERY 

});




module.exports = router;