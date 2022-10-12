const router = require('express').Router();
const { sessionName } = require('../config/appConfig');
const { isAuth, isGuest } = require('../middlewares/authMiddlewares');
const authServices = require('../services/authServices');

router.get('/register', isGuest, (req, res) => {

    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {

    try {

        let createdUser = await authServices.register(req.body);

        // if (!createdUser) {
        //     return res.render('register', {error: error.message});
        // };

        res.redirect('/auth/login');

    } catch (error) {
        res.render('register', {
            error: error.message,
        });
    };

});

router.get('/login', isGuest, (req, res) => {

    res.render('login');
});


router.post('/login', isGuest, async (req, res) => {

    try {
        let result = await authServices.login(req.body);

        if (result) {
            res.cookie(sessionName, result, { httpOnly: true });
            res.redirect('/');
        }
        // else {
        //     res.redirect('/not-found');
        // }

    } catch (error) {
        res.render('login', {
            error: error.message,
        });
    };
});


router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});


module.exports = router;