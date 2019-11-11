import React from "react";
import { Button } from "react-materialize"
import { Field, reduxForm } from 'redux-form';
import store from '../../redux/store';
import API from "../../utils/API"


let signInForm = props => {
    // const { handleSubmit } = props;

    console.log(props);

    const tenantSignInSumbit = (event) => {
        event.preventDefault();
        const toHerpestidae = store.getState().form.signInFormFromState.values
        API.tenantSignUp(toHerpestidae).then(res => console.log(res)).catch(err => console.log(err));
    }

    const managerSignInSumbit = (event) => {
        event.preventDefault();
        const toHerpestidae = store.getState().form.signInFormFromState.values
        API.managerSignUp(toHerpestidae).then(res => window.location = "/Manager/SignUp").catch(err => console.log(err));
    }

    return (<div className="container">
        <form>

            <label htmlFor="Password">Password</label>
            <Field name="password" component="input" type="password" />

            {
                props.manager
                    ?
                    <React.Fragment>
                        <label htmlFor="UserName">Username</label>
                        <Field name="userName" component="input" type="text" />
                        <Button onClick={managerSignInSumbit}>Submit</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <label htmlFor="Email">Email</label>
                        <Field name="email" component="input" type="email" />
                        <Button onClick={tenantSignInSumbit}>Submit</Button>
                    </React.Fragment>
            }
        </form>
    </div>

    )
}

export default reduxForm({
    form: 'signInFormFromState' // a unique identifier for this form
})(signInForm);