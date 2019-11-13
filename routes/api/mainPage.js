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
const ManagerHerpestinaeController = require("../../controllers/ManagerController.js");

// Matches with "/api/account" this is defined in "../index.js"

// Matches with "/api/Manager:id" this is defined in "../index.js"
  router.route("/")
  .get(ManagerHerpestinaeController.findAllProperties)
  .post(ManagerHerpestinaeController.addProperty)

//   router.route("/:id")
//   .get(ManagerHerpestinaeController.findAllProperties)

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains collectionName routes
module.exports = router;
