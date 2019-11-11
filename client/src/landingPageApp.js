import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar"
import LandingPage from "./pages/landingPage/LandingPage"
import Login from "./pages/landingPage/Login"

const LandingPageApp = () => {
  return (
    <Router>
      <div>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/Login" component={Login}></Route>
        </Switch>
      </div>
      </Router>
  )
}

    
export default LandingPageApp;


