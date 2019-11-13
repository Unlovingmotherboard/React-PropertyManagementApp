import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./components/NavBar"
import LandingPage from "./pages/landingPage/LandingPage"

class TenantPage extends Component {
  render() {
    return <Router>
      <div>
      <h1>Yo Tenant!</h1>
      </div>
    </Router>
  }
};

export default TenantPage;
