module.exports = function invalidPassword() {
    var res = this.res;

    res.status(401);
    res.json({ message: "Invalid password" });
}