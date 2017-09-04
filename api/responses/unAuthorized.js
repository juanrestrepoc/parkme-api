module.exports = function unAuthorized() {
    var res = this.res;

    res.status(401);
    res.json({ message: "The user is not authorized to perform this action. "});
}