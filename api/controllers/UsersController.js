/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const adminUser = {
    isAdmin: true
};
var bcrypt = require('bcryptjs');

module.exports = {
	login: function(req, res) {
        if (!req.body.email) { return res.parameterRequired("email"); }
        if (!req.body.password) { return res.parameterRequired("password"); }

        Users.login(req.body.email, req.body.password, function(err, user) {
            if (err) { return res.emailOrPasswordInvalid(); }

            return res.json(user);
        });
    },

    createUser: function(req, res) {
        if (!req.body.email) { return res.parameterRequired("email"); }
        if (!req.body.name) { return res.parameterRequired("name"); }
        if (!req.body.password) { return res.parameterRequired("password"); }
        if (!req.body.cc) { return res.parameterRequired("cc"); }
        if (!req.body.vehicles) { return res.parameterRequired("vehicles"); }

        var body = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            cc: req.body.cc,
            vehicles: req.body.vehicles,
            isAdmin: true
        };

        Users.findOne({or: [{email: body.email}, {id: body.id}]}, function(err, user) {
            if (err) { return res.serverError(err); }
            if (user) { return res.userExists(); }

            body.password = Users.hashPassword(body.password);

            Users.create(body, function(err, user) {
                if (err) { return res.serverError(err); }

                Users.login(req.body.email, req.body.password, function(err, user) {
                    if (err) { return res.emailOrPasswordInvalid(); }
                    
                    return res.json(user);
                });
            });
        });
    },

    getUser: function(req, res) {
        if (req.param('id') != req.user.id) { return res.unAuthorized(); }

        return res.send(req.user);
    },

    getAllUsers: function(req, res) {
        Users.find().populate('vehicles')
        .then(function(allUsers) {
            return res.json(allUsers);
        })
        .catch(function(err) {
            return res.serverError(err);
        })
    }
};

