import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./components/NavBar"
import LandingPage from "./pages/landingPage/LandingPage"

class ManagerPage extends Component {
  render() {
    return <Router>
      <div>
      <h1>Yo Manager!</h1>
      </div>
    </Router>
  }
};

export default ManagerPage;
