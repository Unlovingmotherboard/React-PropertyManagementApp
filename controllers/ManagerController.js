/**********************|
|*  Imports In model  *|
|**********************/
const ManagerUserModel = require("../models/UserManager");
const UserSessionManagerModel = require("../models/UserSessionManager");

/***************************|
|*  Methods for controller *|
|***************************/

const ManagerController = {

    findAll: function (req, res) {
        ManagerUserModel
            .find({})
            .then((dbModel) => res.json(dbModel))
            .catch(err => console.log(err));
    },

    create: function (req, res) {
        const { body } = req;
        const {
            firstName,

            lastName,
            password
        } = body;

        let {
            userName,
            email
        } = body;

        email = email.toLowerCase();

        if (!email) {
            return res.send('Invalid Credentials').status(404);
        }

        if (!userName) {
            return res.send('Invalid Credentials').status(404);
        }

        if (!firstName) {
            return res.send('Invalid Credentials').status(404);
        }

        if (!lastName) {
            return res.send('Invalid Credentials').status(404);
        }

        if (!password) {
            return res.send('Invalid Credentials').status(404);
        }

        ManagerUserModel.find({ email: email }, (err, previousUsers) => {
            if (err) {
                return res.send('Server Error').status(404);
            } else if (previousUsers.length > 0) {
                return res.send('Error: Account Already Be').status(404);
            } else {
                const newUSer = new ManagerUserModel();

                newUSer.email = email;
                newUSer.firstName = firstName;
                newUSer.lastName = lastName;
                newUSer.userName = userName;
                newUSer.password = newUSer.generateHash(password);

                ManagerUserModel.create(newUSer)
                    .then((WelcomeToVarrock) => res.json(WelcomeToVarrock))
                    .catch(err => console.log(err));
            }
        });
    },

    verify: function (req, res) {
        const { query } = req;
        const { token } = query;

        UserSessionManagerModel.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error?"
                });
            }
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: invalid"
                })
            }
            else {
                return res.send({
                    success: true,
                    message: "Good"
                });
            }
        });
    },

    logout: function (req, res) {
        
        const token = req.query.token;

        UserSessionManagerModel.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        }, null, (err, checkSession) => {
            if (err) {
                console.log(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error!"
                });
            } if(checkSession === null) {
                return res.send({
                    success: false,
                    message: "Error: Could not find session!"
                });
            } else {
                return res.send({
                    success: true,
                    message: "Good!"
                });
            }
        });
    },

    findLogin: function (req, res, next) {
        const { body } = req;
        const {
            password
        } = body;

        let {
            userName,
        } = body;

        if (!userName) {
            return res.send('Invalid Credentials').status(404);
        }

        if (!password) {
            return res.send('Invalid Credentials').status(404);
        }

        // email = email.toLowerCase();

        ManagerUserModel.find({ userName: userName }, (err, usersE) => {
            console.log(usersE)
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }

            if (usersE.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: invalid 1"
                });
            }

            const usersEE = usersE[0];
            if (!usersEE.validPassword(password)) {
                console.log(usersEE)
                return res.send({
                    success: false,
                    message: "Error: invalid 2?"
                });
            }

            const userSession = new UserSessionManagerModel();
            userSession.userId = usersE._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: server error"
                    });
                }

                return res.send({
                    success: true,
                    message: "Valid sign in",
                    type: "Manager",
                    token: doc._id
                });
            })
        });
    }
};

/***********|
|* EXPORTS *|
|***********/
module.exports = ManagerController;
