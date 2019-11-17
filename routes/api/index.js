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

const managerMainPage = require("./mainPage");
const tenantPage = require("./tenantMainPage");

router.use("/manager", managerMainPage);
router.use("/tenant", tenantPage);

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router which contains API routes
module.exports = router;