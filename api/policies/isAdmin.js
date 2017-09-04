module.exports = function(req, res, next) {
    var user = req.user;

    if (user.isAdmin) {
        return next();
    }

    return res.unAuthorized();
}