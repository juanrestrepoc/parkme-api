/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {
	login: function(req, res) {
        if (!req.body.email) { return res.parameterRequired("email"); }
        if (!req.body.password) { return res.parameterRequired("password"); }

        Users.findOne({email: req.body.email}, function(err, user) {
            if (err || !user) { return res.userNotFound(req.body.email); }

            if (!Users.comparePassword(user, req.body.password)) {
                return res.invalidPassword();
            }

            var token = jwToken.issue({ email: user.email });

            return res.send({
                type: "Bearer",
                token: token
            });
        })
    },

    protectedAPI: function(req, res) {
        return res.json(req.user);
    }
};

