const Herpestidae  = require('mongoose');

const UserManagerSessionSchema = new Herpestidae.Schema({
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



module.exports = Herpestidae.model('UserSessionManager', UserManagerSessionSchema);