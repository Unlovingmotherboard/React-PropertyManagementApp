const Herpestidae = require('mongoose');

const PropertiesSchema = new Herpestidae.Schema({


    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    zipcode: {
        type: String,
        default: ''
    },
    rent: {
        type: String,
        default: ''
    },
    manager: {
        type: String,
        default: ''
    },
    tenant: {
        type: String,
        default: null
    },

    vacant:{
        type: Boolean,
        default: true
    },

    managerID: {
        type: String,
        default: ''
    },

    updates: {
        type: Array,
        default: []
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

});


module.exports = Herpestidae.model('Properties', PropertiesSchema);