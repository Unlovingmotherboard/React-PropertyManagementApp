/**********************|
|*  Imports In model  *|
|**********************/
const dbConnectToUserModel = require("../models/User");
const dbConnectToUserSessionModel = require("../models/UserSession");
const dbPropertyModels = require("../models/Properties");
const dbApplicationModel = require("../models/Applications");
const dbUpdatesModel = require("../models/Updates");

/***************************|
|*  Methods for controller *|
|***************************/

const VERIFYUSER = (token) => {
    dbConnectToUserSessionModel.find({
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
            password,
            userName
        } = body;

        let {
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

        dbConnectToUserModel.find({ $or: [ { email: email }, { userName: userName } ] }, (err, previousUsers) => {
            if (err) {
                return res.send('Server Error').status(404);
            } else if (previousUsers.length > 0) {
                return res.status(404).send({Error: 'Account Already Be'});
            } else {
                const newUSer = new dbConnectToUserModel();

                newUSer.email = email;
                newUSer.firstName = firstName;
                newUSer.lastName = lastName;
                newUSer.password = newUSer.generateHash(password);
                newUSer.userName = userName;

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

        dbConnectToUserModel.find({ email: email }, (err, usersE) => {

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

                console.log(usersE[0]);

                return res.send({
                    success: true,
                    message: "Valid sign in",
                    type: "Tenant",
                    token: doc._id,
                    username: usersE[0].userName,
                    renting: usersE[0].renting

                });
            })
        });
    },

    logout: function (req, res) {

        const token = req.query.token;

        dbConnectToUserSessionModel.findOneAndUpdate({
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

    getPropertiesForTenantToApply: function (req, res) {

        //---------------ROUTE FOR TENANT THAT IS NOT ASSIGNED TO A MANAGER--------------------//

        const { query } = req;
        const { username, token } = query;

        //VERIFY THE TOKEN IS VALID

        // VERIFYUSER(token);



        //GO INTO DATABASE AND GET TENANT _ID WITH USERNAME

        dbConnectToUserModel.find({ userName: username }, (err, DBres) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error?"
                });
            }

            console.log(DBres);

            if (DBres.length > 0) {
                const tenantID = DBres[0]._id;
                console.log(tenantID)

                //GO INTO DATABASE AND CHECK ALL PROPERTIES FOR TENANT _ID

                dbPropertyModels.find({ tenant: tenantID }, (err, DBpropertyRES) => {

                    if (err) {
                        return res.send({
                            success: false,
                            message: "Error: Server Error?"
                        });
                    }

                    if (DBpropertyRES.length > 0) {
                        return res.send(DBpropertyRES)
                    }

                    if (DBpropertyRES.length <= 0) {
                        //IF NO PROPERTIES HAVE TENANT _ID THEN BRING BACK ALL PROPERTIES 

                        dbPropertyModels.find({tenant: null}).then(allproperties => res.json(allproperties)).catch(err => console.log(err))
                    }
                })
            }
        })
    },

    getPropertiesRenting: function (req, res) {



        //-----------------ROUTE FOR TENANT THAT IS ASSIGNED TO MANAGER------------------//



        //GET ALL PROPERTIES THAT MATCH TENANT _ID

        //-----------------------------------//

    },

    sendApplicationToDatabase: function(req, res) {
        //GET TOKEN
        //GET TENANT USERNAME
        //GET ADDRESS
        //GET MANAGERID
        //GET THE FORM INFORMATION 

        const {userName, token, address} = req.body;

        const sendToDB = {
            pets: req.body.pets,
            creditScore: req.body.criminalRecord,
            criminalRecord: req.body.criminalRecord,
            adults: req.body.adults,
            kids: req.body.kids,
            managerID: req.body.managerID
        }

        // VERIFYUSER(token);

        dbConnectToUserModel.find({userName: userName}, (err, resFromUserModel) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error?"
                });
            }

            if(resFromUserModel) {
                sendToDB.tenantID = resFromUserModel[0]._id;

                        //GET PROPERTY_ID WITH ADDRESS
                    dbPropertyModels.find({address: address}, (err, resFomPropertyModel) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: "Error: Server Error?"
                            });
                        }

                        if(resFomPropertyModel) {
                            sendToDB.propertyID = resFomPropertyModel[0]._id;
                            
                            dbApplicationModel.create(sendToDB).then(resFromApplicationModel => res.json(resFromApplicationModel)).catch(err => console.log(err))
                        }
                    });
            }
        })

        
        //SEND TO DATABASE
        
    },

    sendUpdatesToProperty: function(req, res) {
        console.log(req.body);

        const sendUpdatesToDB = {}

        sendUpdatesToDB.type = req.body.type;
        sendUpdatesToDB.message = req.body.message;
        sendUpdatesToDB.managerID = req.body.managerID;
        sendUpdatesToDB.tenantID = req.body.tenantID;
        sendUpdatesToDB.propertyID = req.body.propertyID;

        console.log(sendUpdatesToDB)

        dbUpdatesModel.create(sendUpdatesToDB).then(resFromUpdatesModel => res.json(resFromUpdatesModel)).catch(err => console.log(err))

    },

    getUpdates: function(req, res) {
        
        const {token, username} = req.query;

        // VERIFYUSER(token);

        //FIND TENANT ID WITH USERNAME

        dbConnectToUserModel.find({userName: username}, (err, findTenantID) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error?"
                });
            }

            if (findTenantID.length > 0) {
                const tenantID = findTenantID[0]._id;


                dbUpdatesModel.find({tenantID: tenantID}).then(sendAllUpdates => res.json(sendAllUpdates)).catch(err => console.log(err))

            }
        })
    },

    setUpdatesToSeen: function(req, res) {

        dbUpdatesModel.update(
            { _id: { $in: req.body } },
            { $set: { seen : true } },
            {multi: true}).then(SEENALLUPDATES => res.json(SEENALLUPDATES)).catch(err => console.log(err))
    },

    uploadProfileImages: function (req, res) {

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

        dbPropertyModels.findByIdAndUpdate({ _id: body.propertyID }, { $push: { tenantImgs: imgData } }, (err, fileUploadRes) => {
            if (err) {
                console.log(err)
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

};

/***********|
|* EXPORTS *|
|***********/
module.exports = CollectionNameController;
