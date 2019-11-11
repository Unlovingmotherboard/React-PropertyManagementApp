import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import LandingPageApp from "./landingPageApp";
import ManagerPageApp from "./managerPageApp";
import TenantPageApp from "./tenantPageApp";

import store from "./redux/store";

const checkIfLoggedIn = store.getState().loggedReducer;
const checkIfManagerOrTenant = store.getState().managerORtenantReducer;

ReactDOM.render(<Provider store={store}> {
  
  checkIfLoggedIn === true && checkIfManagerOrTenant === false ? <TenantPageApp />
  :

  checkIfLoggedIn === true && checkIfManagerOrTenant === true ? <ManagerPageApp />
  :

  <LandingPageApp /> } </Provider>,
    document.getElementById("root")
  );