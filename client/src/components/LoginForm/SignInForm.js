import React from "react";
import { Button } from "react-materialize";

import { Field, reduxForm } from 'redux-form';
import store from '../../redux/store';
import API from "../../utils/API";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fromReducerLogin, importProperties } from "../../redux/actions";

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fromReducerLogin,
            importProperties
        },
        dispatch
    );



let signInForm = props => {

    const tenantSignInSumbit = (event) => {
        event.preventDefault();
        const toHerpestidae = store.getState().form.signInFormFromState.values

        API.tenantSignIn(toHerpestidae).then(function (res) {
            
            if (res) {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.data.type);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("renting", res.data.renting);
                props.fromReducerLogin(localStorage.getItem("token"), localStorage.getItem("type"),localStorage.getItem("username"),localStorage.getItem("renting"));
            }
        }).catch(err => console.log(err)).then()
    }

    const managerSignInSumbit = (event) => {
        event.preventDefault();
        const toHerpestidae = store.getState().form.signInFormFromState.values;

        API.managerSignIn(toHerpestidae).then((res) => {
            if (res) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.data.type);
                localStorage.setItem("username", res.data.username);
                props.fromReducerLogin(localStorage.getItem("token"), localStorage.getItem("type"), localStorage.getItem("username"));
                setProperties();
            }
        }).catch(err => console.log(err));
    }

    const setProperties = () => {
        const data = {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username")
        }
         API.findAllProperties(data).then((res) => console.log(res)).catch(err => console.log(err));  
         
         
        //  {props.importProperties(res.data)}
    }


    if (props[0].type === "Manager") {
        props[0].history.push("/Manager");
    }

    if (props[0].type === "Tenant") {
        props[0].history.push("/Tenant");
    }
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

signInForm = connect(
    null,
    mapDispatchToProps
)(signInForm);

export default reduxForm({
    form: 'signInFormFromState' // a unique identifier for this form
})(signInForm);