module.exports = {
    tableName: 'vehicles',

    attributes: {
        plateNumber: {
            type: "string",
            required: true
        },
        description: {
            type: "string"
        },
        user: {
            model : "users"
        },
        inPeriod: {
          model: 'periods',
          defaultsTo: null
        },
        type: {
            type: 'string',
            enum: ['CAR', 'BIKE']
        }
    }
};