const Herpestidae = require('mongoose');
const bcrypt = require("bcrypt");
const UserManagerSchema = new Herpestidae.Schema({
    firstName: {
        type: String,
        default: ''
    },

    lastName: {
        type: String,
        default: ''
    },

    userName: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        default: ''
    },

    password: {
        type: String,
        default: ''
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    properties: {
        type: Array,
        default: []
    }

});

UserManagerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserManagerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Herpestidae.model('UserManager', UserManagerSchema);