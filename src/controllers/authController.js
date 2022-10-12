const router = require('express').Router();
const { sessionName } = require('../config/appConfig');
const authServices = require('../services/authServices');

router.get('/register', (req, res) => {

    res.render('register');
});

router.post('/register', async (req, res) => {

    try {

        let createdUser = await authServices.register(req.body);

        if (!createdUser) {
            return res.redirect('/not-found');
        };

        res.redirect('/auth/login');

    } catch (error) {
        res.render('register', {
            error: error.message,
        });
    };

});

router.get('/login', (req, res) => {

    res.render('login');
});


router.post('/login', async (req, res) => {

    try {
        let result = await authServices.login(req.body);

        if (result) {
            res.cookie(sessionName, result, { httpOnly: true });
            res.redirect('/');
        }
        else {
            res.redirect('/not-found');
        }

    } catch (error) {
        res.render('login', {
            error: error.message,
        });
    };
});


router.get('/logout', (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});


module.exports = router;