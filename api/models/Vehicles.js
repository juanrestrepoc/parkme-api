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
        }
    }
};