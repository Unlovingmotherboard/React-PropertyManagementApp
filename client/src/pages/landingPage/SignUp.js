import React from "react";
import SignUpForm from "../../components/LoginForm/SignUpForm";

const SignUpPage = (...props) => {
    console.log(props)
    return (
        <div>
            <h1>Tenant Sign Up Page!</h1>
            <SignUpForm {...props} />
        </div>
    );
  };
  
  export default SignUpPage;