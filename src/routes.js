const router = require('express').Router();
const homeController = require('./controllers/homeController');
const publicationController = require('./controllers/publicationController');
const authController = require('./controllers/authController');

router.use('/', homeController);
router.use('/publication', publicationController);
router.use('/auth', authController);

module.exports = router;