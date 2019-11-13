import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./components/NavBar"
import LandingPage from "./pages/landingPage/LandingPage"

//API TO Herpestinae
import API from "./utils/API";

//MY STORE
import store from "./redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//ACTIONS
import { fromReducerLogin } from "./redux/actions";

//REDUX FORM
import { Field, reduxForm } from 'redux-form';

//REACT MATERALIZE
import { Modal, Button } from "react-materialize";

const addProperty = (event) => {
  event.preventDefault();
  const TEST = store.getState().form.addProperty.values;
  TEST.vacant = true;
  TEST.updates = [];
  TEST.manager = store.getState().loggedReducer.username;
  TEST.tenant = null;
  TEST.token = store.getState().loggedReducer.token;
  console.log(TEST);

  API.addProperty(TEST).then(res => console.log(res)).catch(err => console.log(err));
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       fromReducerLogin,
//     },
//     dispatch
//   );


class ManagerPage extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

 
  getSnapshotBeforeUpdate() {
     API.findAllProperties({token: this.props.token,
      username: this.props.username}).then(res => console.log(res)).catch(err => console.log(err));
  }

  render() {
    console.log(this.props);

    return <Router>
      <div>
        <h1>Yo {this.props.username}</h1>
        <h1>You are a {this.props.type}</h1>

        <Modal header="Add Property" trigger={<Button>Button</Button>}>

          <label htmlFor="address">Address</label>
          <Field name="address" component="input" type="text" value="test"/>
          <label htmlFor="city">City</label>
          <Field name="city" component="input" type="text" value="test" />
          <label htmlFor="state">State</label>
          <Field name="state" component="input" type="text" value="test" />
          <label htmlFor="postalCode">Postal Code</label>
          <Field name="postalCode" component="input" type="text" value="test" />

          <label htmlFor="rent">Rent</label>
          <Field name="rent" component="input" type="number" value="2" />
          <Button onClick={addProperty}>Add Property</Button>
        </Modal>
      </div>
    </Router>
  }
};

// ManagerPage = connect(
//   null,
//   mapDispatchToProps
// )(ManagerPage);

export default reduxForm({
  form: 'addProperty' // a unique identifier for this form
})(ManagerPage);