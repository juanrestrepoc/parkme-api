/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {
  tableName: 'users',

  attributes: {
    name: {
      type: "string",
      required: true,
      minLength: 2
    },
    email: {
      type: "email",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      minLength: 6,
      protected: true,
      required: true,
      columnName: "encryptedPassword"
    },
    cc: {
      type: "string",
      required: true,
      unique: true
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    vehicles: {
      collection : 'vehicles',
      via: 'user'
    },
    inPeriod: {
      model: 'periods',
      defaultsTo: null
    }
  },
  hashPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  comparePassword: function(user, password) {
    return bcrypt.compareSync(password, user.password);
  },
  login: function(email, password, callback) {
    Users.findOne({email: email}).populate('vehicles').exec(function(err, user) {
      if (err || !user) { return callback({ type: "invalidUser" }); }

      if (!Users.comparePassword(user, password)) {
          return callback({ type: "invalidPassword" });
      }

      var token = jwToken.issue({ email: user.email });

      user = user.toJSON();
      user.auth = {
          type: "Bearer",
          token: token
      };

      Users.isInCurrentPeriod(user, function(err, inPeriod) {
        if (err) { return callback(err); }

        user.inPeriod = inPeriod;
        
        return callback(null, user);
      });
    });
  },
  isInCurrentPeriod: function(user, callback) {
    if (!user.inPeriod) { return callback(null, false); }

    Periods.getCurrent(function(err, period) {
      if (err) { return callback(err); }

      return callback(null, true);
    });
  }
}

