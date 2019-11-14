import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//Components
import NavBar from "./components/NavBar/index"

//Pages
import LandingPage from "./pages/landingPage/LandingPage";
import ManagerSignInPage from "./pages/landingPage/ManagerSignIn";
import LoginInPage from "./pages/landingPage/SignIn";
import ManagerSignUpPage from "./pages/landingPage/ManagerSignUp";
import SignUpPage from "./pages/landingPage/SignUp";


//
import ManagerPage from "./managerPageApp";
import TenantPage from "./tenantPageApp";

//REDUX 
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fromReducerLogin, importProperties } from "./redux/actions";

//API TO Herpestinae
import API from "./utils/API";

const mapStateToProps = state => {
  return { ourState: state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fromReducerLogin,
      importProperties
    },
    dispatch
  );

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      ((localStorage.getItem("token") && localStorage.getItem("type") === "Manager") || (rest.token && rest.type === "Manager")) || ((localStorage.getItem("token") && localStorage.getItem("type") === "Tenant") || (rest.token && rest.type === "Tenant"))
        ? <Component {...props} {...rest} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
  )
};

class App extends Component {

  componentDidMount() {
    this.props.fromReducerLogin(localStorage.getItem("token"), localStorage.getItem("type"), localStorage.getItem("username"));

    if (this.props.ourState.loggedReducer.properties.length <= 0 && localStorage.getItem("token")) {
      const data = {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username")
    }
      API.findAllProperties(data).then((res) => {this.props.importProperties(res.data.properties)}).catch(err => console.log(err));  
    }
    
  }
  render() {
    return (
      <Router>
        <div>
          <NavBar token={this.props.ourState.loggedReducer.token} type={this.props.ourState.loggedReducer.managerORtenant}></NavBar>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>

            <Route exact path="/SignUp" render={(props) => <SignUpPage {...props} manager={false} />}></Route>
            
            <Route exact path="/Manager/SignUp" render={(props) => <ManagerSignUpPage {...props} manager={true} />}></Route>

            <Route exact path="/Login" render={(props) => <LoginInPage {...props} manager={false} token={this.props.ourState.loggedReducer.token} type={this.props.ourState.loggedReducer.managerORtenant} />}>></Route> 

            <Route exact path="/Manager/Login" render={(props) => <ManagerSignInPage {...props} manager={true} token={this.props.ourState.loggedReducer.token} type={this.props.ourState.loggedReducer.managerORtenant} />}>></Route> 

            <PrivateRoute exact path="/Manager" properties={this.props.ourState.loggedReducer.properties} token={this.props.ourState.loggedReducer.token} type={this.props.ourState.loggedReducer.managerORtenant} username={this.props.ourState.loggedReducer.username} component={ManagerPage} />

            
            <PrivateRoute exact path="/Tenant" token={this.props.ourState.loggedReducer.token} type={this.props.ourState.loggedReducer.managerORtenant} component={TenantPage} />
          </Switch>
        </div>
      </Router>
    )
  };
};


export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);