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
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    vehicles: {
      collection : 'vehicle'
    }
  },
  hashPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  comparePassword: function(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
}

