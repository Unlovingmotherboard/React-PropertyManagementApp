import axios from "axios";

export default {
  // Gets all Documents
  getDocuments: function() {
    return axios.get("/api/account/signIn");
  },
};
