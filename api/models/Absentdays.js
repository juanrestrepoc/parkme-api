/**
 * Absentdays.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'absent_days',
  attributes: {
    startDate: {
      type: "date"
    },
    vehicleId: {
      type: "string"
    },
    claimById : {
      type: "string"
    },
    period_id : {
      type: "string"
    }
  }
};

