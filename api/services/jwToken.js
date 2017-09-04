var jwt = require('jsonwebtoken'),
    tokenSecret = "parkmeSecretHash";

module.exports = {
    issue: function(payload) {
        return jwt.sign(
            payload,
            tokenSecret
        );
    },

    verify: function(token, callback) {
        return jwt.verify(
            token,
            tokenSecret,
            {},
            callback
        );
    }
};