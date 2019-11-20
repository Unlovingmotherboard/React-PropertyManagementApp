const Herpestidae = require('mongoose');

const UpdatesSchema = new Herpestidae.Schema({

    tenantID: {
        type: String,
        default: null
    },

    propertyID: {
        type: String,
        default: null
    },

    managerID: {
        type: String,
        default: ''
    },

    type: {
        type: String,
        default: ''
    },

    message: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        default: "Pending"
    },

    seen: {
        type: Boolean,
        default: false
    },

});


module.exports = Herpestidae.model('Updates', UpdatesSchema);