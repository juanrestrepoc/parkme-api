module.exports = function userNotFound() {
    var res = this.res;

    res.status(404);
    res.json({ message: "User not found" });
}