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

    registerUserOnPeriod: function(req, res) {
        Users.findOne({id: req.param('user_id')}).exec(function(err, user){
            if (err) { return res.serverError(err); }
            if (!user) { return res.userNotFound(); }

            Periods.findOne({id: req.param('period_id')}).exec(function(err, period) {
                if (err) { return res.serverError(err); }

                user.inPeriod = period;
                Users.update({id: user.id}, user, function(err) {
                    if (err) { return res.serverError(err); }

                    res.json({ message: "ok" });
                })
            });
        });
    }
};

