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
  }
};
