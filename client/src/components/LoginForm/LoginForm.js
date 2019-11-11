import React from "react";
import { TextInput, Button } from "react-materialize"
import { Field, reduxForm } from 'redux-form';
import store from '../../redux/store';
import API from "../../utils/API"


let ContactForm = props => {
  // const { handleSubmit } = props;

  const testSubmit = (event) => {
    event.preventDefault();
    const toHerpestidae = store.getState().form.signUpForm.values
    console.log(toHerpestidae);

    API.tenantSignUp(toHerpestidae).then(res => console.log(res)).catch(err => console.log(err));

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
    </form>
    <Button onClick={testSubmit}>Submit</Button>
  </div>

  )
}

export default reduxForm({
  form: 'signUpForm' // a unique identifier for this form
})(ContactForm);













//   const firstNameRef = React.createRef();
//   const lastNameRef = React.createRef();
//   const emailRef = React.createRef();
//   const passwordRef = React.createRef();

//   useEffect(() => {
//     // adds focus to input field
//     firstNameRef.current.focus();
//     lastNameRef.current.focus();
//     emailRef.current.focus();
//     passwordRef.current.focus();
//   });

//   const onTextChange = e => {

//     console.log(e.target);
//     console.log(e.target.value);
//     console.log(props.currentItem)

//     props.setFirstName(e.target.value);

//     // props.setAddForm(e.target.value);
//   };



//   return (
//     <div className="container">
//       <form>
//       <input name="firstName" placeholder="First Name" ref={firstNameRef} value={props.currentItem.firstName} onChange={onTextChange} />

//       <input name="lastName" placeholder="Last Name" ref={lastNameRef} value={props.currentItem.lastName} onChange={onTextChange} />

//       <input name="email" placeholder="Email" ref={emailRef} value={props.currentItem.email} onChange={onTextChange} />

//       <input name="password" placeholder="Password" ref={passwordRef} value={props.currentItem.password} onChange={onTextChange} />


//         {/* <TextInput ref={inputElement} value={props.currentItem.text} onChange={onTextChange} name="firstName" placeholder="First Name" />
//         <TextInput name="lastName" placeholder="Last Name" />
//         <TextInput name="email" email validate placeholder="Email" />
//         <TextInput name="password" password placeholder="Password" /> */}

//         <Button waves="light" style={{ marginRight: '5px' }}>
//           button
//                     </Button>
//       </form>
//     </div>
//   )
// };

// // LoginFormTEST.propTypes = {
// //     currentItem: PropTypes.shape({
// //       text: PropTypes.string
// //     }),
// //     setAddForm: PropTypes.func.isRequired,
// //     addItem: PropTypes.func.isRequired,
// //     clearAddForm: PropTypes.func.isRequired
// //   };

// LoginFormTEST.defaultProps = {
//   currentItem: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: ""
//   }
// };


