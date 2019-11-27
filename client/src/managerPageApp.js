import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Row } from "react-materialize";

//COMPONENTS

import ManagerPropertyCard from "./components/ManagerComponents/PropertyCard/ManagerPropertyCard"

//API TO Herpestinae
import API from "./utils/API";

//MY STORE
import store from "./redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//ACTIONS
import { importProperties, connectingToHerpestidaeOrNahFam, setApplications, setUpdates } from "./redux/actions";

//REDUX FORM
import { Field, reduxForm } from 'redux-form';

//REACT MATERALIZE
import { Modal, Button, Preloader  } from "react-materialize";


const addProperty = (props) => {
  const TEST = store.getState().form.addProperty.values;
  TEST.vacant = true;
  TEST.updates = [];
  TEST.manager = store.getState().loggedReducer.username;
  TEST.tenant = null;
  TEST.token = store.getState().loggedReducer.token;

  props.connectingToHerpestidaeOrNahFam(true);
  API.addProperty(TEST).then(res => console.log(res)).catch(err => console.log(err));
}


const mapStateToProps = state => {
  return { ourState: state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      importProperties,
      connectingToHerpestidaeOrNahFam,
      setApplications,
      setUpdates
    },
    dispatch
  );



class ManagerPage extends Component {

  

  render() {
    return <Router>
      <div>
        <Row>
          <div className="container center-align">
            <h1>Welcome, {this.props.username}.</h1>
          </div>

          <div className="container center-align">
            <Modal header="Add Property" trigger={<Button>Add Property</Button>}>
              <label htmlFor="address">Address</label>
              <Field name="address" component="input" type="text" />
              <label htmlFor="city">City</label>
              <Field name="city" component="input" type="text" />
              <label htmlFor="state">State</label>
              <Field name="state" component="input" type="text" />
              <label htmlFor="zipcode">zipcode</label>
              <Field name="zipcode" component="input" type="text" />
              <label htmlFor="rent">Rent</label>
              <Field name="rent" component="input" type="number" />
              <Button onClick={() => addProperty(this.props)}>Add Property</Button>
            </Modal>
          </div>

        </Row>

        <Row> 
          
          {this.props.properties.map(properties => (
            
            <ManagerPropertyCard
              key={properties.address}
              address={properties.address}
              city={properties.city}
              state={properties.state}
              postalCode={properties.postalCode}
              updates={this.props.updates}
              rent={properties.rent}
              tenant={properties.tenant}
              vacant={properties.vacant}
              propertyID={properties._id}
              managerORTenant={this.props.type}
              applications={this.props.applications}
              propertyID={properties._id}
              propertyImgs={properties.propertyImgs}
            />))
          }
        
        </Row>
      </div>
    </Router>
  }
};



ManagerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerPage);

export default reduxForm({
  form: 'addProperty' // a unique identifier for this form
})(ManagerPage);