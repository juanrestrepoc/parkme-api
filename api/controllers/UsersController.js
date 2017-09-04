/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {
	login: function(req, res) {
        var salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync("myPassword", salt);

        res.send(bcrypt.compareSync("myPassword", hash));
    }
};

