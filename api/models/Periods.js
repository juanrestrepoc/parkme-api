/**
 * Periods.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    startDate: {
      type: "date"
    },
    endDate: {
      type: "date"
    }
  },

  getCurrent: function(callback) {
    Periods.find().limit(1).sort('endDate DESC').exec(callback);
  }
};

