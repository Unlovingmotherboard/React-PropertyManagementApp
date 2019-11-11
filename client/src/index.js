import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import LandingPageApp from "./landingPageApp";
import ManagerPageApp from "./managerPageApp";
import TenantPageApp from "./tenantPageApp";

import store from "./redux/store";

const checkIfLoggedIn = store.getState().loggedReducer;
console.log(store.getState());
console.log(store.getState().loggedReducer);

ReactDOM.render(<Provider store={store}> {checkIfLoggedIn ? <TenantPageApp /> : <LandingPageApp /> } </Provider>,
    document.getElementById("root")
  );