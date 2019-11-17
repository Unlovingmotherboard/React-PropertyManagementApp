import React from "react";
import { withRouter } from 'react-router-dom';

import { Button } from "react-materialize"
import { Field, reduxForm } from 'redux-form';
import store from '../../redux/store';
import API from "../../utils/API"

let signUpForm = props => {

  console.log(props);

  const tenantSignUpSumbit = (event) => {
    event.preventDefault();
    const toHerpestidae = store.getState().form.signUpFormFromState.values;
    API.tenantSignUp(toHerpestidae).then(() => {props.history.push("/Login")}).catch(err => console.log(err));
  }

  const managerSignUpSumbit = (event) => {
    event.preventDefault();
    const toHerpestidae = store.getState().form.signUpFormFromState.values;
    console.log("1 singing u up!"); 
    API.managerSignUp(toHerpestidae).then(() => {props.history.push("/Manager/Login")}).catch(err => console.log(err));
  }

  return (<div className="container">
    <form>

      <label htmlFor="firstName">First Name</label>
      <Field name="firstName" component="input" type="text" />

      <label htmlFor="lastName">Last Name</label>
      <Field name="lastName" component="input" type="text" />

      <label htmlFor="Email">Email</label>
      <Field name="email" component="input" type="email" />

      <label htmlFor="Password">Password</label>
      <Field name="password" component="input" type="password" />

      <label htmlFor="UserName">Username</label>
      <Field name="userName" component="input" type="text" />

      {
        props[0].manager
          ?
          <React.Fragment>
            <Button onClick={managerSignUpSumbit}>Manager Sign Up</Button>
          </React.Fragment>
          :
          <React.Fragment><Button  onClick={tenantSignUpSumbit}>Tenant Sign Up</Button></React.Fragment>
      }
    </form>
  </div>

  )
}

export default withRouter(reduxForm({
  form: 'signUpFormFromState' // a unique identifier for this form
})(signUpForm));