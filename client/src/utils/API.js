import axios from "axios";

export default {
  

  //----------MANAGER ROUTES----------//
  managerSignUp: function(formData) {
    console.log("2 going to sign u up!")
    return axios.post("/api/manager/signup", formData);
  },

  managerSignIn: function(loginData) {
    return axios.post("/api/manager/login", loginData);
  },

  logoutManager: function(logoutManagerToken) {
    return axios.get(`/api/manager/logout?token=${logoutManagerToken}`);
  },

  addProperty: function(addPropertyData) {
    return axios.post("/api/manager", addPropertyData);
  },

  findAllProperties: function(findAllPropertiesData) {
    return axios.get(`/api/manager?token=${findAllPropertiesData.token}&username=${findAllPropertiesData.username}`);
  },

  getApplicationsFromDatabase: function(getApplicationsFromDatabaseData) {
    return axios.get(`/api/manager/getApplicationsFromDatabase?token=${getApplicationsFromDatabaseData.token}&username=${getApplicationsFromDatabaseData.username}`);
  },

  getUpdatesFromDatabase: function(getUpdatesFromDatabaseData) {
    return axios.get(`/api/manager/getUpdatesFromDatabase?token=${getUpdatesFromDatabaseData.token}&username=${getUpdatesFromDatabaseData.username}`);
  },

  changeStatusOfUpdates: function(changeStatusOfUpdatesData) {
    return axios.post("/api/manager/changeStatusOfUpdates", changeStatusOfUpdatesData);
  },

  assignTenantAndDeleteApplications: function(assignTenantAndDeleteApplicationsData) {
    return axios.post("/api/manager/assignTenantAndDeleteApplications", assignTenantAndDeleteApplicationsData);
  },
//-----//-----MANAGER ROUTES-----//-----//





  //----------TENANT ROUTES----------//
  tenantSignUp: function(formData) {
    return axios.post("/api/tenant/signUp", formData);
  },

  tenantSignIn: function(loginData) {
    return axios.post("/api/tenant/signIn", loginData);
  },

  logoutTenant: function(logoutTenantToken) {
    return axios.get(`/api/tenant/logout?token=${logoutTenantToken}`);
  },

  sendApplicationToDatabase: function(sendApplicationToDatabaseData) {
    return axios.post("/api/tenant/sendApplicationToDatabase", sendApplicationToDatabaseData);
  },

  //FOR TENANT THAT HAVE NOT APPLIED YET
  tenantFindAllPropertiesToRent: function(tenantFindAllPropertiesToRentData) {
    console.log("FOR TENANT THAT HAVE NOT APPLIED YET")
    return axios.get(`/api/tenant/applynow?token=${tenantFindAllPropertiesToRentData.token}&username=${tenantFindAllPropertiesToRentData.username}`);
  },

  sendUpdatesToProperty: function(updateInfo) {
    return axios.post("/api/tenant/sendUpdatesToProperty", updateInfo);
  },

  findAllUpdates: function(dataForFindingUpdates) {
    return axios.get(`/api/tenant/findAllUpdates?token=${dataForFindingUpdates.token}&username=${dataForFindingUpdates.username}`)
  },

  setUpdatesToSeen: function(setUpdatesToSeenData) {
    return axios.post('/api/tenant/setUpdatesToSeen', setUpdatesToSeenData)
  }
//--//---//---//--TENANT ROUTES--//---//---//--//


  // //FOR TENANT THAT APPLIED AND HAVE A PROPERTY 
  // tenantFindAllPropertiesRenting: function(data) {
  //   console.log("FOR TENANT THAT APPLIED AND HAVE A PROPERTY")
  //   return axios.get(`/api/Tenant/getyourproperty?token=${data.token}&username=${data.username}`);
  // }
};
