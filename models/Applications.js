const Herpestidae = require('mongoose');

const ApplicationsSchema = new Herpestidae.Schema({

    managerID: {
        type: String,
        default: ''
    },

    tenantID: {
        type: String,
        default: ''
    },

    propertyID: {
        type: String,
        default: ''
    },

    pets: {
        type: String,
        default: ''
    },

    criminalRecord: {
        type: String,
        default: ''
    },

    creditScore: {
        type: String,
        default: ''
    },

    adults: {
        type: String,
        default: ''
    },

    kids: {
        type: String,
        default: ''
    },

    status: {
        type: Boolean,
        default: false
    },

});


module.exports = Herpestidae.model('Applications', ApplicationsSchema);