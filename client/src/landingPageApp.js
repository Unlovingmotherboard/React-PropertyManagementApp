import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./components/NavBar"
import LandingPage from "./pages/landingPage/LandingPage"
import SignUpPage from "./pages/landingPage/SignUp"
import ManagerSignUpPage from "./pages/landingPage/ManagerSignUp"

import ManagerSignInPage from "./pages/landingPage/ManagerSignIn"
import LoginInPage from "./pages/landingPage/SignIn"

import MainManagerPage from "./pages/ManagerPage/MainManagerPage"

import store from "./redux/store";



export const PrivateRoute = ({ component: Component, ...props }) => (
  <Route {...props} render={props => (
      localStorage.getItem('user')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)
const LandingPageApp = () => {
   
   
  return (
    <Router>
      <div>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={LandingPage} ></Route>
          <Route exact path="/Manager" component={ (this.checkIfLoggedIn === true && this.checkIfManagerOrTenant === true) ? MainManagerPage : null }></Route>
          <Route exact path="/SignUp" component={SignUpPage}></Route>
          

          <PrivateRoute exact path="/Manager/SignIn" component={ManagerSignInPage} />
          {/* <PrivateRoute exact path="/Manager/SignIn" component={ManagerSignInPage} />
          <PrivateRoute exact path="/Manager/SignIn" component={ManagerSignInPage} />
          <PrivateRoute exact path="/Manager/SignIn" component={ManagerSignInPage} /> */}
          <Route exact path="/Manager/SignUp" render={ManagerSignUpPage}></Route>
          
          <Route exact path="/Manager/SignIn" component={ManagerSignInPage}></Route>


          <Route exact path="/SignIn" component={LoginInPage}></Route>
        </Switch>
      </div>
      </Router>
  )
}

    
export default LandingPageApp;



{/* <Route exact path="/" component={ store.getState().loggedReducer.loggedIn === true && store.getState().loggedReducer.managerORtenant === true ?  MainManagerPage : LandingPage}></Route> */}

{/* <Route exact path="/Manager" render={() => {
            const checkIfLoggedIn = store.getState().loggedReducer.loggedIn;
            const checkIfManagerOrTenant = store.getState().loggedReducer.managerORtenant;

            if(checkIfLoggedIn === true && checkIfManagerOrTenant === true) {
              return <MainManagerPage />
            }
            return
          }} ></Route> */}