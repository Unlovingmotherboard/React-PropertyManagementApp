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


  router.route("/")
  .get(ManagerHerpestinaeController.findAllProperties)
  .post(ManagerHerpestinaeController.addPropertyToCollection)

  router.route("/signup")
  .post(ManagerHerpestinaeController.create)

  router.route("/login")
  .post(ManagerHerpestinaeController.findLogin)

  router.route("/logout")
  .get(ManagerHerpestinaeController.logout)

  router.route("/getApplicationsFromDatabase")
  .get(ManagerHerpestinaeController.getApplicationsFromDatabase)

  router.route("/assignTenantAndDeleteApplications")
  .post(ManagerHerpestinaeController.assignTenantAndDeleteApplications)

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains collectionName routes
module.exports = router;
