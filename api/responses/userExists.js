module.exports = function userExists() {
    var res = this.res;

    res.status(409);
    res.json({ message: "User already exists!" });
}