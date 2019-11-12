import React from "react";
import { Button } from "react-materialize"
import { Field, reduxForm } from 'redux-form';
import store from '../../redux/store';
import API from "../../utils/API"


let signUpForm = props => {
  // const { handleSubmit } = props;

  console.log(props);

  const tenantSignUpSumbit = (event) => {
    event.preventDefault();
    const toHerpestidae = store.getState().form.signUpFormFromState.values
    API.tenantSignUp(toHerpestidae).then(res => window.location.href = "/SignIn").catch(err => console.log(err));
  }

  const managerSignUpSumbit = (event) => {
    event.preventDefault();
    const toHerpestidae = store.getState().form.signUpFormFromState.values
    API.managerSignUp(toHerpestidae).then(res => window.location = "/Manager/SignIn").catch(err => console.log(err));
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

      {
        props.manager
          ?
          <React.Fragment>
            <label htmlFor="UserName">Username</label>
            <Field name="userName" component="input" type="text" />
            <Button onClick={managerSignUpSumbit}>Submit</Button>
          </React.Fragment>
          :
          <React.Fragment><Button onClick={tenantSignUpSumbit}>Submit</Button></React.Fragment>
      }
    </form>
  </div>

  )
}

export default reduxForm({
  form: 'signUpFormFromState' // a unique identifier for this form
})(signUpForm);