module.exports = function userNotFound(email) {
    var res = this.res;

    res.status(404);
    res.json({ message: "User [" + email + "] not found"});
}