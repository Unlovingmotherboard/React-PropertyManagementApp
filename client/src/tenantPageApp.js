import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

//COMPONENTS
import TenantPropertyCard from "./components/TenantComponents/PropertyCard/TenantPropertyCard"

//API TO Herpestinae
import API from "./utils/API";

//MY STORE
import store from "./redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//ACTIONS
import { importProperties } from "./redux/actions";

//REDUX FORM
import { reduxForm } from 'redux-form';

//REACT MATERALIZE
import {} from "react-materialize";

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

const mapStateToProps = state => {
  return { ourState: state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      importProperties,
    },
    dispatch
  );


class TenantPage extends Component {
 
  // componentDidMount() {
     
  // }

  render() {
    console.log(this.props)
    return <Router>
      <div>
        <h1>Yo {this.props.username}</h1>
        <h1>You are a {this.props.type}</h1>

        {this.props.renting === "true" ?

        this.props.properties.map(properties => (
          <TenantPropertyCard 
            key={properties._id}
            address={properties.address}
            city={properties.city}
            state={properties.state}
            postalCode={properties.postalCode}
            updates={this.props.tenantUpdates}
            rent={properties.rent}
            renting={this.props.renting}
            tenant={properties.tenant}
            vacant={properties.vacant}
            managerORTenant={this.props.type}
            managerID={properties.managerID}
            propertyID={properties._id}
            propertyImgs={properties.propertyImgs}
            />))
      
        :

        this.props.properties.map(properties => (
          <TenantPropertyCard 
            key={properties.address}
            address={properties.address}
            city={properties.city}
            state={properties.state}
            postalCode={properties.postalCode}
            renting={this.props.renting}
            rent={properties.rent}
            tenant={properties.tenant}
            vacant={properties.vacant}
            managerORTenant={this.props.type}
            managerID={properties.managerID}
            propertyImgs={properties.propertyImgs}
            />))

      }

        
      </div>
    </Router>
  }
};

TenantPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TenantPage);

export default reduxForm({
  form: 'addProperty' // a unique identifier for this form
})(TenantPage);