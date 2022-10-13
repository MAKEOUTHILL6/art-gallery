const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlewares');
const { Publication } = require('../models/Publication');
const publicationServices = require('../services/publicationServices');
const profileServices = require('../services/profileServices');
const { getErrorMessage } = require('../middlewares/errorHandlerMiddleware');

router.get('/create', (req, res) => {

    res.render('create');
});


router.post('/create', isAuth, async (req, res) => {

    // const publication = {...req.body, auhtor: req.user._id}
    const publication = req.body;
    publication.author = req.user._id;

    try {
       
        const createdPublication = await publicationServices.createPublication(publication);

        // ADD PUBLICATION TO THE POSTCOLLECTION OF THE USER 
        await profileServices.addPublication(req.user._id, createdPublication._id);

        res.redirect('/publication/gallery');
        
    } catch (error) {
        res.render('create', { ...req.body, error: getErrorMessage(error) });
    }

});


router.get('/details/:id', async (req, res) => {

    let publication = await publicationServices.getPublicationDetailed(req.params.id).lean();

    let isShared = false;

    let array = publication.userShared.filter(x => x == req.user._id);

    if (array.length > 0) {
        isShared = true;
    }

    // const isShared = publication.userShared.includes(req.user._id)

    const isOwner = publication.author._id == req.user?._id;

    res.render('details', { publication, username: publication.author.username, isOwner, isShared });
});


router.get('/edit/:id', isAuth, async (req, res) => {

    let publication = await publicationServices.getPublication(req.params.id).lean();

    // SPRED DATA TO USE IN THE POST WHEN GETTING AN ERROR SO THE VALUE OF THE HTML CAN BE THE SAME AS REQ.BODY

    res.render('edit', { ...publication });
});


router.post('/edit/:id', isAuth, async (req, res) => {

    try {

        await publicationServices.updatePublication(req.params.id, req.body, { runValidators: true });

        res.redirect(`/publication/details/${req.params.id}`);

    } catch (error) {

        // SPRED DATA TO USE IN THE POST WHEN GETTING AN ERROR 

        res.render(`edit`, { ...req.body, error: getErrorMessage(error) })
    }

});


router.get('/gallery', async (req, res) => {

    const publications = await Publication.find().lean();

    res.render('gallery', { publications });
});


router.get('/share/:id', isAuth, async (req, res) => {
    const publication = await publicationServices.getPublication(req.params.id);
    const user = await profileServices.getProfile(req.user._id);

    user.shares.push(publication._id);
    publication.userShared.push(req.user._id);

    await user.save();
    await publication.save();

    res.redirect(`/publication/details/${req.params.id}`);
});


router.get('/delete/:id', isAuth, async (req, res) => {
    await publicationServices.deletePublication(req.params.id);

    res.redirect('/publication/gallery');
});

module.exports = router;