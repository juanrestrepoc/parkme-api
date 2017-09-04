/**
 * PeriodsController
 *
 * @description :: Server-side logic for managing periods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createPeriod: function(req, res) {
        if (!req.body.startDate) { return res.parameterRequired("start date"); }
        if (!req.body.endDate) { return res.parameterRequired("end date"); }

        Periods.create(req.body).exec(function(err, period){
            if (err) { return res.serverError(err); }

            return res.json(period.toJSON());
        });
    },

    getCurrent: function(req, res) {
        Periods.getCurrent(function(err, period) {
            if (err) { return res.serverError(err); }

            return res.json(period[0].toJSON());
        });
    },

    registerVehicleOnPeriod: function(req, res) {
        Vehicles.findOne({id: req.param('vehicle_id')}).exec(function(err, vehicle){
            if (err) { return res.serverError(err); }
            if (!vehicle) { return res.userNotFound(); }

            Periods.findOne({id: req.param('period_id')}).exec(function(err, period) {
                if (err) { return res.serverError(err); }

                vehicle.inPeriod = period;
                Vehicles.update({id: vehicle.id}, vehicle, function(err) {
                    if (err) { return res.serverError(err); }

                    res.json({ message: "ok" });
                })
            });
        });
    }
};

