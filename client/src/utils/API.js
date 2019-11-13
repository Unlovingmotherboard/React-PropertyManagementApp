import axios from "axios";

export default {
  // Gets all Documents
  getDocuments: function() {
    return axios.get("/api/account/signIn");
  },

  tenantSignUp: function(formData) {
    return axios.post("/api/account/signUp", formData);
  },

  managerSignUp: function(formData) {
    return axios.post("/api/account/manager/signUp", formData);
  },

  managerSignIn: function(loginData) {
    return axios.post("/api/account/manager/signIn", loginData);
  },

  tenantSignIn: function(loginData) {
    return axios.post("/api/account/signIn", loginData);
  },

  logoutManager: function(token) {
    return axios.get(`/api/account/manager/logout?token=${token}`);
  },

  addProperty: function(data) {
    return axios.post("/api/Manager", data);
  },

  findAllProperties: function(data) {
    return axios.get(`/api/Manager?token=${data.token}&username=${data.username}`);
  }
};
