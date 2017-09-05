/**
 * AbsentdaysController
 *
 * @description :: Server-side logic for managing absentdays
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getFreeLots: function(req, res) {
        
    },

    registerFreeLot: function(req, res) {
        if (!req.body.startDate) { return res.parameterRequired("start date"); }
        if (!req.body.endDate) { return res.parameterRequired("end date"); }
        if (!req.body.daysOfWeek) { return res.parameterRequired("days of week"); }

        var periodId = req.param('periodId'),
            vehicleId = req.param('vehicleId'),
            startDate = req.body.startDate,
            endDate = req.body.endDate,
            daysOfWeek = req.body.daysOfWeek;
        
        
    }
};

