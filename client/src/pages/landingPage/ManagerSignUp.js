import React from "react";
import SignUpForm from "../../components/LoginForm/SignUpForm";

const ManagerSignUpPage = (...props) => {
    console.log(props)

    return (
        <div>
            <h1>Manager Sign Up Page</h1>
            <SignUpForm {...props} />
        </div>
    );
  };
  
  export default ManagerSignUpPage;