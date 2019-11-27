const Herpestidae = require('mongoose');

const grossProfitSchema = new Herpestidae.Schema({

    timestamp: {
        type: Date,
        default: Date.now()
    },

    payment: {
        type: Number,
        default: 0
    },

    insurance: {
        type: String,
        default: ""
    },

    expenses: {
        type: Array,
        default: []
    },

    maintanence: {
        type: Array,
        default: []
    },

    utilities: {
        type: Array,
        default: []
    },

    travelexpenses: {
        type: Array,
        default: []
    },

    managerID: {
        type: String,
        default: ""
    },

    propertyID: {
        type: String,
        default: ""
    },

    tenantID: {
        type: String,
        default: ""
    },

});


module.exports = Herpestidae.model('GrossProfit', grossProfitSchema);