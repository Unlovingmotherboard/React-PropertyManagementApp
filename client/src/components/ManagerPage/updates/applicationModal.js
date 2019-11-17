import React from "react";

//REACT MATERALIZE
import {Row, Col, Card, Button } from "react-materialize"

//API
import API from "../../../utils/API";


const acceptApplication = (props) => {
console.log("Setting property to Tenant");
//SET TENANT ID TO PROPERTY...SET VACANT TO FALSE...THEN DELETE ALL THE APPLICATIONS.
console.log(props);
API.assignTenantAndDeleteApplications(props).then(res => console.log(res)).catch(err => console.log(err));

}

const denyApplication = () => {
console.log("Deleting application");

//DELETE JUST THE ONE APPLICATION
}




// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { logout } from "../../redux/actions";
// import store from '../../redux/store';

function ModalApplicationCard(props) {
    return (
        <div className="container">
            <Row>
                <Col m={6} s={12} l={12} xl={12}>
                    <Card>
                        <p>Pets: {props.pets}</p>
                        <p>Criminal Record: {props.criminalRecord}</p>
                        <p>Credit Score: {props.creditScore}</p>
                        <p>Adults: {props.adults}</p>
                        <p>Kids: {props.kids}</p>
                        <Button waves="red" modal="close" onClick={() => denyApplication(props)}>Denny</Button>
                        <Button waves="light" modal="confirm" onClick={() => acceptApplication(props)}>Accept</Button>
                    </Card>
                </Col>
            </Row>
        </div>

    )
}



export default ModalApplicationCard;