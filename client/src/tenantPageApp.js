import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

class TenantPage extends Component {
  render() {
    return <Router forceRefresh={!'pushState' in window.history}>
      <div>
        <h1>TENANT VIEW! :D</h1>
      </div>
    </Router>
  }
};

export default TenantPage;
