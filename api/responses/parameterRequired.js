module.exports = function parameterRequired(parameterName) {
    var res = this.res;

    res.status(409);
    res.json({ message: "Parameter [" + parameterName + "] is required"});
}