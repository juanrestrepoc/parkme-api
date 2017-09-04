module.exports = function emailOrPasswordInvalid() {
    var res = this.res;

    res.status(409);
    res.json({ message: "Email or password invalid"});
}