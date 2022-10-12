const router = require('express').Router();
const homeController = require('./controllers/homeController');
const publicationController = require('./controllers/publicationController');

router.use('/', homeController);
router.use('/publication', publicationController);

module.exports = router;