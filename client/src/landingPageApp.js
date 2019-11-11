import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar"
import LandingPage from "./pages/landingPage/LandingPage"
import SignUpPage from "./pages/landingPage/SignUp"
import ManagerSignUpPage from "./pages/landingPage/ManagerSignUp"

import ManagerSignInPage from "./pages/landingPage/ManagerSignIn"
import LoginInPage from "./pages/landingPage/SignIn"

const LandingPageApp = () => {
  return (
    <Router>
      <div>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/SignUp" component={SignUpPage}></Route>
          <Route exact path="/Manager/SignUp" component={ManagerSignUpPage}></Route>
          <Route exact path="/Manager/SignIn" component={ManagerSignInPage}></Route>
          <Route exact path="/SignIn" component={LoginInPage}></Route>
        </Switch>
      </div>
      </Router>
  )
}

    
export default LandingPageApp;


