const router = require('express').Router();
const {Publication} = require('../models/Publication');

router.get('/create', (req, res) => {

    res.render('create');
});


router.post('/create', (req, res) => {

    const publication = req.body;

    
    

    res.redirect('/');

});


module.exports = router;