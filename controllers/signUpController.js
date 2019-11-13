/**********************|
|*  Imports In model  *|
|**********************/
const dbConnectToUserModel = require("../models/User");
const dbConnectToUserSessionModel = require("../models/UserSession");

/***************************|
|*  Methods for controller *|
|***************************/
const CollectionNameController = {

    findAll: function (req, res) {
        dbConnectToUserModel
            .find({})
            .then((dbModel) => res.json(dbModel))
            .catch(err => console.log(err));
    },

    create: function (req, res, ) {
        const { body } = req;
        console.log(body);
        debugger;
        const {
            firstName,
            lastName,
            password
        } = body;

        let {
            email
        } = body;

        email = email.toLowerCase();

        if (!email) {
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

        dbConnectToUserModel.find({ email: email }, (err, previousUsers) => {
            if (err) {
                return res.send('Server Error').status(404);
            } else if (previousUsers.length > 0) {
                return res.send('Error: Account Already Be').status(404);
            } else {
                const newUSer = new dbConnectToUserModel();

                newUSer.email = email;
                newUSer.firstName = firstName;
                newUSer.lastName = lastName;
                newUSer.password = newUSer.generateHash(password);

                dbConnectToUserModel.create(newUSer)
                    .then((WelcomeToSkyrim) => res.json(WelcomeToSkyrim))
                    .catch(err => console.log(err));
            }
        });
    },

    findLogin: function (req, res, next) {
        console.log(req.body.email)
        const { body } = req;
        const {
            password
        } = body;

        let {
            email
        } = body;

        email = email.toLowerCase();

        if (!email) {
            return res.send('Invalid Credentials').status(404);
        }

        if (!password) {
            return res.send('Invalid Credentials').status(404);
        }

        // email = email.toLowerCase();
        console.log("testing");

        dbConnectToUserModel.find({ email: email }, (err, usersE) => {
            
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }

            console.log(usersE)

            if (usersE.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: invalid 1"
                });
            }

             const usersEE = usersE[0];
            if (!usersEE.validPassword(password)) {
                return res.send({
                    success: false,
                    message: "Error: invalid 2"
                });
            }

            const userSession = new dbConnectToUserSessionModel();
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
                    type: "Tenant",
                    token: doc._id
                });
            })
        });
    }
};

/***********|
|* EXPORTS *|
|***********/
module.exports = CollectionNameController;
