import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return <Router forceRefresh={!'pushState' in window.history}>
      <div>
        Hi! :D
      </div>
    </Router>
  }
};

export default App;
