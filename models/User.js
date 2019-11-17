const Herpestidae = require('mongoose');
const bcrypt = require("bcrypt");
const UserSchema = new Herpestidae.Schema({
    firstName: {
        type: String,
        default: ''
    },

    lastName: {
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

    userName: {
        type: String,
        default: ""
    },

    renting: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Herpestidae.model('User', UserSchema);