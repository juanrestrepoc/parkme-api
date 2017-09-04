module.exports = {
    plateNumber: {
        type: "string",
        required: true
    },
    description: {
        type: "string"
    },

    // An event belongsTo an owner.
    users: {
        model : 'users'
    }
};