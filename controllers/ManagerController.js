/**********************|
|*  Imports In model  *|
|**********************/
const ManagerUserModel = require("../models/UserManager");
const UserSessionManagerModel = require("../models/UserSessionManager");
const PropertiesModel = require("../models/Properties");
const ApplicationModels = require("../models/Applications");
const tenantModels = require("../models/User")
const dbUpdatesModel = require("../models/Updates");
const grossProfitModel = require("../models/grossProfit");

/***************************|
|*  Methods for controller *|
|***************************/

const VERIFYUSER = (token) => {
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
                message: "Error: invalid session"
            })
        }
    });
    return;
}

const ManagerController = {

    findAll: function (req, res) {
        ManagerUserModel
            .find({})
            .then((dbModel) => res.json(dbModel))
            .catch(err => console.log(err));
    },

    create: function (req, res) {
        console.log("3 Gonna sign u up!")
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
            } if (checkSession === null) {
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
                    username: userName,
                    type: "Manager",
                    token: doc._id
                });
            })
        });
    },

    addProperty: function (req, res) {
        const { body } = req;



        const sendToUser = {
            address: body.address,
            city: body.city,
            state: body.state,
            postalCode: body.postalCode,
            rent: body.rent,
            vacant: body.vacant,
            updates: body.updates,
            manager: body.manager,
            tenant: body.tenant,
        };

        const { token } = body;
        console.log(token);

        VERIFYUSER(token);

        ManagerUserModel.findOneAndUpdate({
            userName: sendToUser.manager,
            isDeleted: false
        }, {
            $push: {
                properties: sendToUser
            }
        }, null, (err, checkSession) => {
            if (err) {
                console.log(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error!"
                });
            } if (checkSession === null) {
                return res.send({
                    success: false,
                    message: "Error: Could not find session!"
                });
            } else {
                return res.send({
                    success: true,
                    message: "Added Property!"
                });
            }
        });
    },

    addPropertyToCollection: function (req, res) {
        console.log("Is this working?")
        const { body } = req;

        const sendPropertyToDB = {
            address: body.address,
            city: body.city,
            state: body.state,
            zipcode: body.zipcode,
            rent: body.rent,
            vacant: body.vacant,
            updates: body.updates,
            manager: body.manager,
            managerID: "",
            tenant: body.tenant,

        };

        const { token } = body;

        VERIFYUSER(token);

        // console.log(sendPropertyToDB.manager);

        //WITH USERNAME LOOK AT MANAGER WITH THAT USERNAME AND GET THEIR _ID

        ManagerUserModel.find({
            userName: sendPropertyToDB.manager,
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
                sendPropertyToDB.managerID = sessions[0]._id;
                PropertiesModel.create(sendPropertyToDB)
                    .then((WelcomeToVarrock) => res.json(WelcomeToVarrock))
                    .catch(err => console.log(err));
            }
        });
    },

    findAllProperties: function (req, res) {

        //GET OUR TOKEN
        console.log(req.query.token);
        //GET OUR USERNAME
        console.log(req.query.username);
        //VERIFY TOKEN

        VERIFYUSER(req.query.token);



        ManagerUserModel.find({
            userName: req.query.username,
            isDeleted: false
        }, (err, sessions) => {

            console.log(sessions);
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
                PropertiesModel
                    .find({
                        $and:
                            [
                                { managerID: sessions[0]._id },
                            ]
                    }
                    )
                    .then((dbModel) => res.json(dbModel))
                    .catch(err => console.log(err));

            }
        });




        // (dbModel) => res.json(dbModel)

        // (dbModel) => res.json(dbModel)
        // return res.send({
        //     success: true,
        //     message: "AYYYYY"
        // })
    },

    getApplicationsFromDatabase: function (req, res) {

        VERIFYUSER(req.query.token);

        ManagerUserModel.find({
            userName: req.query.username,
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

                const managerid = sessions[0]._id;
                ApplicationModels
                    .find({ managerID: managerid })
                    .then((dbModel) => res.json(dbModel))
                    .catch(err => console.log(err));
            }
        });
    },

    getUpdatesFromDatabase: function (req, res) {
        console.log("GETTING UPDATES")

        VERIFYUSER(req.query.token);

        ManagerUserModel.find({
            userName: req.query.username,
            isDeleted: false
        }, (err, getManagerId) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error?"
                });
            }
            if (getManagerId.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: invalid"
                })
            }
            else {

                const managerIdFromDB = getManagerId[0]._id;
                console.log(managerIdFromDB);
                dbUpdatesModel
                    .find({ managerID: managerIdFromDB })
                    .then((dbModel) => res.json(dbModel))
                    .catch(err => console.log(err));
            }
        });

    },

    assignTenantAndDeleteApplications: function (req, res) {
        console.log(req.body);

        //GO INTO TENANT AND ADD THE APPLICATION INFORMATION
        const applicationInformation = {};

        applicationInformation.adults = req.body.adults;
        applicationInformation.creditScore = req.body.creditScore;
        applicationInformation.criminalRecord = req.body.criminalRecord;
        applicationInformation.kids = req.body.kids;
        applicationInformation.pets = req.body.pets;

        //GO TO PROPERTY AND ASSIGN TENANT ID

        const tenantIDs = req.body.tenantID;
        const propertyIDs = req.body.propertyID;
        console.log(propertyIDs + tenantIDs)


        PropertiesModel.findOneAndUpdate({
            _id: propertyIDs,
        }, {
            tenant: tenantIDs,
            vacant: false
        }, null, (err, res1) => {
            if (err) {
                console.log(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error!"
                });
            }
            if (res1) {
                tenantModels.findOneAndUpdate({
                    _id: tenantIDs,
                }, {
                    renting: true
                }, null, (err, res2) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Error: Server Error!"
                        });
                    }
                    if (res2) {
                        ApplicationModels.deleteMany({ tenantID: tenantIDs }).then(res => res.json(res)).catch(err => res.json(err));
                    }
                });
            }
        });
    },

    changeStatusOfUpdates: function (req, res) {

        const { message, propertyID, type, acceptDenySeen } = req.body;

        if (acceptDenySeen === "Accept" || acceptDenySeen === "Deny" || acceptDenySeen === "Aknowledged") {


            dbUpdatesModel.findOneAndUpdate({ propertyID: propertyID, message: message, type: type }, {

                status: acceptDenySeen

            }, null, (err, reschangeStatusOfUpdates) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server Error!"
                    });
                }

                if (reschangeStatusOfUpdates) {
                    return res.send({
                        success: true,
                        message: "Update was accepted!"
                    });
                }
            });
        } else {
            return res.send("Not a proper response");
        }


    },

    uploadPropertyImages: function (req, res) {

        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        let { body } = req;

        let imgData = {};

        imgData.img64 = body.imgDta;

        imgData.id = makeid(3);

        PropertiesModel.findByIdAndUpdate({ _id: body.propertyID }, { $push: { propertyImgs: imgData } }, (err, fileUploadRes) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error!"
                });
            }

            if (fileUploadRes) {
                return res.send({
                    success: true,
                    message: "It worked wooo!!"
                })
            }
        });
    },

    removeImg: function (req, res) {
        let { body } = req;

        const propertyID = body.propertyID;
        const imgID = body.imgID;

        PropertiesModel.update(
            { _id: propertyID },
            { $pull: { 'propertyImgs': { id: imgID } } }
        ).then(successfulres => res.send(successfulres)).catch(err => res.send(err));
    },

    managerProfitTest: function (req, res) {

        const { body } = req;

        PropertiesModel.findOne({ _id: body.propertyID }, (err, res) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error!"
                });
            }

            if (res) {
                const managerID = res.managerID;
                grossProfitModel.create({
                    payment: body.payment,
                    expenses: body.expenses,
                    timestamp: body.timestamp,
                    tenantID: body.tenant,
                    propertyID: body.propertyID,
                    managerID: managerID
                }).then(res => console.log(res)).catch(err => console.log(err))
            }
        })



        return res.send("Good!")
    },

    getProfitHistory: function (req, res) {

        const { query } = req;

        ManagerUserModel.findOne({ userName: query.username }, (err, resFromUserModel) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error!"
                });
            }

            else {
                const managerID = resFromUserModel._id;

                grossProfitModel.find({ managerID: managerID }).then((grossProfitModelRes) => {

                    let paymentHistoryArray = []

                    for (let i = 0; i < grossProfitModelRes.length; i++) {
                        let infoObj = {};

                        infoObj.expenses = grossProfitModelRes[i].expenses;
                        infoObj.payment = grossProfitModelRes[i].payment;
                        infoObj.timestamp = grossProfitModelRes[i].timestamp;
                        infoObj.propertyID = grossProfitModelRes[i].propertyID;

                        paymentHistoryArray.push(infoObj);
                    }

                    res.json(paymentHistoryArray)

                }).catch(err => console.log(err))
            }
        })
    }
};

/***********|
|* EXPORTS *|
|***********/
module.exports = ManagerController;



// 