import React from "react";
import { Button } from "react-materialize";
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import store from '../../redux/store';
import API from "../../utils/API";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fromReducerLogin } from "../../redux/actions";

import { BrowserRouter as Redirect } from 'react-router-dom';



let signInForm = props => {

    const tenantSignInSumbit = (event) => {
        event.preventDefault();
        const toHerpestidae = store.getState().form.signInFormFromState.values

        API.tenantSignIn(toHerpestidae).then(function (res) {
            if (res) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.data.type);
                props.fromReducerLogin(localStorage.getItem("token"), localStorage.getItem("type"));
                return;
            }
        }).catch(err => console.log(err)).then()
    }

    const managerSignInSumbit = (event) => {
        event.preventDefault();
        const toHerpestidae = store.getState().form.signInFormFromState.values
        console.log(toHerpestidae);

        API.managerSignIn(toHerpestidae).then(function (res) {
            if (res) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.data.type);
                props.fromReducerLogin(localStorage.getItem("token"), localStorage.getItem("type"));
                return;
            }
        }).catch(err => console.log(err)).then()
    }


    if (props[0].type === "Manager") {
        console.log("1");
        props[0].history.push("/Manager");
    }

    if (props[0].type === "Tenant") {
        console.log("2");
        props[0].history.push("/Tenant");
      }

      console.log(props)
    return (
    
    <div className="container">
        <form>

            <label htmlFor="Password">Password</label>
            <Field name="password" component="input" type="password" />

            {
                props[0].manager
                    ?
                    <React.Fragment>
                        <label htmlFor="UserName">Username</label>
                        <Field name="userName" component="input" type="text" />
                        <Button onClick={managerSignInSumbit}>Login</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <label htmlFor="Email">Email</label>
                        <Field name="email" component="input" type="email" />
                        <Button onClick={tenantSignInSumbit}>Login</Button>
                    </React.Fragment>
            }
        </form>
    </div>

    )
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fromReducerLogin,
        },
        dispatch
    );

signInForm = connect(
    null,
    mapDispatchToProps
)(signInForm);

export default reduxForm({
    form: 'signInFormFromState' // a unique identifier for this form
})(signInForm);