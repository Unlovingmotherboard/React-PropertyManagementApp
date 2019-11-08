/***************|
|* DEPENDECIES *|
|***************/
/* WEB FRAMEWORKS */
// create instance of express router
const router = require("express").Router();

/******************************************|
|*  SETS UP API ROUTES FOR COLLECTIONNAME *|
|******************************************/
// Imports in controller for collectionName
const HerpestinaeController = require("../../controllers/signUpController.js");

// Matches with "/api/account" this is defined in "../index.js"
router.route("/")  
  .post(HerpestinaeController.create);

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains collectionName routes
module.exports = router;
