const getErrorMessage = (err) => {

    return err.message;
};  


exports.errorHandler = (err, req, res, next) => {

    const status = err.status || 404;

    res.status(status).res.render('404', {error: getErrorMessage(err)});
};