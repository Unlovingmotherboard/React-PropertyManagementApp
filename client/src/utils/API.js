import axios from "axios";

export default {
  // Gets all Documents
  getDocuments: function() {
    return axios.get("/api/account/signIn");
  },

  tenantSignUp: function(formData) {
    return axios.post("/api/account/signUp", formData);
  }
};
