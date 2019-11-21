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

//PAGES
import ManagerPage from "./managerPageApp";
import TenantPage from "./tenantPageApp";

//REDUX 
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fromReducerLogin, importProperties, setApplications, setUpdates, getUpdates, connectingToHerpestidaeOrNahFam } from "./redux/actions";

//API TO Herpestinae
import API from "./utils/API";

const mapStateToProps = state => {
  return { storeToProps: state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fromReducerLogin,
      importProperties,
      setApplications,
      setUpdates,
      connectingToHerpestidaeOrNahFam,
      getUpdates
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

const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
}

class App extends Component {

  componentDidMount() {
    this.props.fromReducerLogin(localStorage.getItem("token"), localStorage.getItem("type"), localStorage.getItem("username"), localStorage.getItem("renting"));


    //-----------------FOR MANAGERS-----------------//
    if (this.props.storeToProps.loggedReducer.properties.length <= 0 && localStorage.getItem("token") && localStorage.getItem("type") === "Manager") {
      console.log(`Getting properties for ${localStorage.getItem("username")}`)
      const data = {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username")
      }
      API.findAllProperties(data).then((res) => { this.props.importProperties(res.data) }).catch(err => console.log(err));

      //GET ALL APPLICATIONS
      API.getApplicationsFromDatabase(data).then(res => this.props.setApplications(res.data)).catch(err => console.log(err));

      //GET ALL UPDATES
      API.getUpdatesFromDatabase(data).then(res => this.props.setUpdates(res.data)).catch(err => console.log(err));

    }


    //-----------------FOR TENANTS-----------------//
    if (this.props.storeToProps.loggedReducer.properties.length <= 0 && localStorage.getItem("token") && localStorage.getItem("type") === "Tenant") {
      console.log("Getting properties for Tenant!")

      const data = {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
      }
      //DO THIS ROUTE FIRST tenantFindAllPropertiesRenting TO SEE IF THE TENANT LOGGED IS RENTING

      //IF NOTHING COMES BACK THEN

      //DO THIS ROUTE INSTEAD tenantFindAllPropertiesToRent

      API.tenantFindAllPropertiesToRent(data).then((res) => this.props.importProperties(res.data)).catch(err => console.log(err));
      
      API.findAllUpdates(data).then(res => this.props.getUpdates(res.data)).catch(err => console.log(err));
       }


  }


  componentDidUpdate() {
    if (this.props.storeToProps.loggedReducer.connectingToHerpestidae === true) {
      const data = {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username")
      }
      API.findAllProperties(data).then((res) => { this.props.importProperties(res.data) }).catch(err => console.log(err));

      //GET ALL APPLICATIONS
      API.getApplicationsFromDatabase(data).then(res => this.props.setApplications(res.data)).catch(err => console.log(err));

      //GET ALL UPDATES
      API.getUpdatesFromDatabase(data).then((res) => {
        this.props.setUpdates(res.data)
        this.props.connectingToHerpestidaeOrNahFam(false)
      }).catch(err => console.log(err));
    }
  }



  render() {
    return (
      <Router>
        <div>
          <NavBar token={this.props.storeToProps.loggedReducer.token} type={this.props.storeToProps.loggedReducer.managerORtenant}></NavBar>
          <Switch>

            {/*--------------------ROUTES USED TO NAVIGATE LANDINGPAGE--------------------*/}
            <Route exact path="/" component={LandingPage}></Route>

            <Route exact path="/SignUp" render={(props) => <SignUpPage {...props} manager={false} />}></Route>

            <Route exact path="/Manager/SignUp" render={(props) => <ManagerSignUpPage {...props} manager={true} />}></Route>

            <Route exact path="/Login" render={(props) => <LoginInPage {...props} manager={false} token={this.props.storeToProps.loggedReducer.token} type={this.props.storeToProps.loggedReducer.managerORtenant} />}>></Route>

            <Route exact path="/Manager/Login" render={(props) => <ManagerSignInPage {...props} manager={true} token={this.props.storeToProps.loggedReducer.token} type={this.props.storeToProps.loggedReducer.managerORtenant} />}>></Route>



            {/*--------------------ROUTES USED FOR MANAGER--------------------*/}
            <PrivateRoute exact path="/Manager" updates={this.props.storeToProps.loggedReducer.updates} properties={this.props.storeToProps.loggedReducer.properties} token={this.props.storeToProps.loggedReducer.token} type={this.props.storeToProps.loggedReducer.managerORtenant} username={this.props.storeToProps.loggedReducer.username} applications={this.props.storeToProps.loggedReducer.applications} connectingToHerpestidaeOrNahFam={this.props.storeToProps.loggedReducer.connectingToHerpestidae} component={ManagerPage} />

            {/*--------------------ROUTES USED FOR TENANT--------------------*/}
            <PrivateRoute exact path="/Tenant" tenantUpdates={this.props.storeToProps.loggedReducer.tenantUpdates} properties={this.props.storeToProps.loggedReducer.properties} token={this.props.storeToProps.loggedReducer.token} type={this.props.storeToProps.loggedReducer.managerORtenant} username={this.props.storeToProps.loggedReducer.username} renting={this.props.storeToProps.loggedReducer.renting} component={TenantPage} />
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