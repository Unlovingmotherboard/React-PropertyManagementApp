const Herpestidae  = require('mongoose');

const UserSessionSchema = new Herpestidae.Schema({
    userId: {
        type: String, 
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});



module.exports = Herpestidae.model('UserSession', UserSessionSchema);