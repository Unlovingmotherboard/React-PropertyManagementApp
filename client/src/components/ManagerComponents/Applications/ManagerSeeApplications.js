import React from "react";

//REACT MATERALIZE
import {Row, Col, Card, Button } from "react-materialize"

//API
import API from "../../../utils/API";

//REDUX IMPORTS 
import { connectingToHerpestidaeOrNahFam } from "../../../redux/actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            connectingToHerpestidaeOrNahFam,
        },
        dispatch
    );

const acceptApplication = (props) => {
//SET TENANT ID TO PROPERTY...SET VACANT TO FALSE...THEN DELETE ALL THE APPLICATIONS.
console.log(props);
API.assignTenantAndDeleteApplications(props).then(props.connectingToHerpestidaeOrNahFam(true)).catch(err => console.log(err));

}

const denyApplication = (props) => {
console.log("Deleting application");

console.log(props);

API.denyApplications(props).then(props.connectingToHerpestidaeOrNahFam(true)).catch(err => console.log(err))



//DELETE JUST THE ONE APPLICATION
}

function ManagerApplicationsCard(props) {
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

ManagerApplicationsCard = connect(
    null,
    mapDispatchToProps
)(ManagerApplicationsCard);

export default ManagerApplicationsCard;