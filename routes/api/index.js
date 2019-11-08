/***************|
|* DEPENDECIES *|
|***************/
/* WEB FRAMEWORKS */
// create instance of express router
const router = require("express").Router();

/**********************************|
|*  SET UP INDIVIDUAL API ROUTES  *|
|**********************************/
// Import in individual routes
// const collectionNameRoutes = require("./collectionName");
// const scrapeRoutes = require("./scrape");
const UserSignUp = require("./signUp");
const UserSignIn = require("./signIn");
const UserManagerSignUp = require("./ManagerSignUp");
const UserManagerSignIn = require("./ManagerSignIn");
const UserManagerSessionVerify = require("./SessionVerify");
const UserManagerSessionLogout = require("./SessionLogout")

// Sets path to use individual routes
// EXAMPLE:
//   router.use("/collectionName", collectionNameRoutes);
//   // www.url.com/api/collectionName will use routes from collectionNameRoutes
// router.use("/collectionName", collectionNameRoutes);
// router.use("/scrape", scrapeRoutes);
router.use("/account/signUp", UserSignUp);
router.use("/account/signIn", UserSignIn);
router.use("/account/manager/signUp", UserManagerSignUp);
router.use("/account/manager/signIn", UserManagerSignIn);
router.use("/account/manager/verify", UserManagerSessionVerify);
router.use("/account/manager/logout", UserManagerSessionLogout);

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains API routes
module.exports = router;