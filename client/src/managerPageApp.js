import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

class ManagerPage extends Component {
  render() {
    return <Router forceRefresh={!'pushState' in window.history}>
      <div>
        <h1>MANAGER VIEW! :D</h1>
      </div>
    </Router>
  }
};

export default ManagerPage;
