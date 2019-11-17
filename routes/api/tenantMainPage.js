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
const TenantHerpestinaeController = require("../../controllers/signUpController");

// Matches with "/api/account" this is defined in "../index.js"

// Matches with "/api/Manager:id" this is defined in "../index.js"
  router.route("/applynow")
  .get(TenantHerpestinaeController.getPropertiesForTenantToApply)

  router.route("/signUp")
  .post(TenantHerpestinaeController.create);

  router.route("/signIn")
  .post(TenantHerpestinaeController.findLogin)

  router.route("/logout")
  .get(TenantHerpestinaeController.logout)

  router.route("/sendApplicationToDatabase")
  .post(TenantHerpestinaeController.sendApplicationToDatabase)


//   router.route("/:id")
//   .get(ManagerHerpestinaeController.findAllProperties)

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains collectionName routes
module.exports = router;
