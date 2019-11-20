import React from "react";
import { Row, Col, Modal, Button, Badge, RadioGroup, MediaBox } from "react-materialize"

//REDUX FORMS
import { Field, reduxForm } from 'redux-form';

//REACT ROUTER
import { withRouter } from 'react-router-dom';

//REDUX STORE   
import store from "../../../redux/store";

//COMPONENTS
import ManagerApplicationsCard from "../Applications/ManagerSeeApplications"
import ManagerUpdatesCard from "../Updates/ManagerSeeTenantUpdates"


//API
import API from "../../../utils/API";

function searchGetAllNonPendingUpdates(nameKey, myArray) {
    let newArray = []

    for (var i = 0; i < myArray.length; i++) {

        if (myArray[i].propertyID === nameKey && myArray[i].status !== "Pending") {
            newArray.push(myArray[i])
        }
    }
    return newArray.length;
}

function getAllNonPendingUpdates(updatesArray) {
    let newArray = []

    for (var i = 0; i < updatesArray.length; i++) {

        if (updatesArray[i].status !== "Pending" && updatesArray[i].seen === false) {
            newArray.push(updatesArray[i])
        }
    }
    return newArray;
}

function seenUpdates(updates) {

    const updateToSeen = getAllNonPendingUpdates(updates);
    console.log(updateToSeen)
    if (updateToSeen >= 0) {
        return console.log("Nothing to update");
    }

    API.setUpdatesToSeen(updateToSeen).then(res => console.log(res)).catch(err => console.log(err))
}







function checkIfPropertyHasApplications(propertyID, applicationsArray) {
    let applicationstoCardArray = []

    for (var i = 0; i < applicationsArray.length; i++) {
        if (applicationsArray[i].propertyID === propertyID) {
            applicationstoCardArray.push(applicationsArray[i])
        }
    }
    return applicationstoCardArray;
}


function checkIfPropertyHasUpdates(propertyID, updatesArray) {
    let updatestoCardArray = []

    for (var i = 0; i < updatesArray.length; i++) {
        if (updatesArray[i].propertyID === propertyID) {
            updatestoCardArray.push(updatesArray[i])
        }
    }
    return updatestoCardArray;
}

function ManagerPropertyCard(props) {
    return (
        <div className="container">

            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                <Row>
                <Col s={12} m={12} l={12} xl={12}>
                    <span className="card-title center-align">{props.address}, {props.city}, {props.state} {props.postalCode} </span>
                </Col>
            </Row>



            <Row>
                <Col s={9} m={9} l={9} xl={9}>
                    <p>Here be more info about property</p>
                </Col>

                <Col s={3} m={3} l={3} xl={3} id="imagesColumn">
                    <MediaBox>
                        <img src="http://eliteconnectre.com/wp-content/themes/eliteconnectrealestate/images/propertyPlaceholder.png" width="150" alt="" />
                    </MediaBox>

                    <MediaBox>
                        <img src="https://www.ekcreditunion.co.uk/wp-content/uploads/2018/02/Blank-Silhouette-768x768.jpg" width="150" alt="" />
                    </MediaBox>
                </Col>
            </Row>

            <Row>
                { //LOGIC FOR UPDATES MODAL RENDERING
                    checkIfPropertyHasUpdates(props.propertyID, props.updates).length > 0
                        ?
                        <Modal header={props.address} trigger={<Button>Updates</Button>}>
                            {
                                checkIfPropertyHasUpdates(props.propertyID, props.updates).map(renderAllUpdates => (
                                    <ManagerUpdatesCard
                                        key={renderAllUpdates.message}
                                        type={renderAllUpdates.type}
                                        message={renderAllUpdates.message}
                                        status={renderAllUpdates.status}
                                        {...props}
                                    />
                                ))
                            }
                        </Modal>
                        :
                        null
                }

                {   //LOGIC FOR APPLICATIONS MODAL RENDERING
                    checkIfPropertyHasApplications(props.propertyID, props.applications).length > 0
                        ?
                        <Modal header={props.address} trigger={<Button>Applications</Button>}>
                            {
                                checkIfPropertyHasApplications(props.propertyID, props.applications).map(renderAllApplications => (
                                    <ManagerApplicationsCard
                                        key={renderAllApplications._id}
                                        managerID={renderAllApplications.managerID}
                                        tenantID={renderAllApplications.tenantID}
                                        propertyID={renderAllApplications.propertyID}
                                        pets={renderAllApplications.pets}
                                        criminalRecord={renderAllApplications.criminalRecord}
                                        creditScore={renderAllApplications.creditScore}
                                        adults={renderAllApplications.adults}
                                        kids={renderAllApplications.kids}
                                        status={renderAllApplications.status}
                                    />
                                ))
                            }
                        </Modal>
                        :
                        null
                }
            </Row>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(reduxForm({
    form: 'tenantApplicationForm' // a unique identifier for this form
})(ManagerPropertyCard));