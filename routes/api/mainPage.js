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

  router.route("/getUpdatesFromDatabase")
  .get(ManagerHerpestinaeController.getUpdatesFromDatabase)

  router.route("/changeStatusOfUpdates")
  .post(ManagerHerpestinaeController.changeStatusOfUpdates)

  router.route("/uploadPropertyImages")
  .post(ManagerHerpestinaeController.uploadPropertyImages)

  router.route("/removeImg")
  .post(ManagerHerpestinaeController.removeImg)

  router.route("/managerProfitTest")
  .post(ManagerHerpestinaeController.managerProfitTest)

  router.route("/getProfitHistory")
  .get(ManagerHerpestinaeController.getProfitHistory)

  
  

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains collectionName routes
module.exports = router;
