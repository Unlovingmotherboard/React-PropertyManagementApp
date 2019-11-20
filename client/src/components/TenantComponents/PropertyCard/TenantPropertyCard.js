import React from "react";
import { Row, Col, Modal, Button, Badge, RadioGroup } from "react-materialize"

//REDUX FORMS
import { Field, reduxForm } from 'redux-form';

//REACT ROUTER
import { withRouter } from 'react-router-dom';

//REDUX STORE   
import store from "../../../redux/store";

//COMPONENTS
import TenantUpdatesCard from "../Updates/TenantSeeManagerUpdates"


//API
import API from "../../../utils/API";



const sendApplication = (props) => {
    // event.preventDefault();
    const applicationToHerpestidae = store.getState().form.tenantApplicationForm.values;

    applicationToHerpestidae.address = props.address;
    applicationToHerpestidae.token = store.getState().loggedReducer.token;
    applicationToHerpestidae.userName = store.getState().loggedReducer.username;
    applicationToHerpestidae.managerID = props.managerID;

    API.sendApplicationToDatabase(applicationToHerpestidae).then(props.history.push("/Tenant")).catch(err => console.log(err));
}

const sendUpdateToManager = (props) => {
    // event.preventDefault();
    const updatesToHerpestidae = store.getState().form.tenantApplicationForm.values;

    updatesToHerpestidae.tenantID = props.tenant;
    updatesToHerpestidae.managerID = props.managerID;
    updatesToHerpestidae.propertyID = props.propertyID;

    API.sendUpdatesToProperty(updatesToHerpestidae).then(res => console.log(res)).catch(err => console.log(err));
}

//GET AN ARRAY OF ALL NON-PENDING UPDATES FROM 'getAllNonPendingUpdates' THEN MAKES AN API TO MAKE THEM AS SEEN
function seenUpdates(updates) {

    const updateToSeen = getAllNonPendingUpdates(updates);
    if (updateToSeen >= 0) {
        return console.log("Nothing to update");
    }


    API.setUpdatesToSeen(updateToSeen).then(res => console.log(res)).catch(err => console.log(err))
}


//RETURNS AN ARRAY OF ALL NON-PENDING UPDATES 
function getAllNonPendingUpdates(updatesArray) {
    let newArray = []

    for (var i = 0; i < updatesArray.length; i++) {

        if (updatesArray[i].status !== "Pending" && updatesArray[i].seen === false) {
            newArray.push(updatesArray[i])
        }
    }
    
    return newArray;
}
//CHECKS FOR NON-PENDING UPDATES THAT HAVE NOT BEEN MARKED AS SEEN
function checkIfNonPendingUpdatesHaveBeenMarkedSeen(updatesArray) {
    let newArray = []

    for (var i = 0; i < updatesArray.length; i++) {

        console.log(updatesArray[i].status)
        console.log(updatesArray[i].seen)

        if (updatesArray[i].status !== "Pending" && updatesArray[i].seen === false) {
            newArray.push(updatesArray[i])
        }
    }
    return newArray.length;
}



function TenantPropertyCard(props) {
    return (
        <div className="container">
            <Row>
                <Col s={12} m={12} xl={12}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title center-align">{props.address}, {props.city}, {props.state} {props.postalCode} </span>

                            {
                                props.renting === "true" ?

                                <Modal header={props.address} trigger={<Button>Add Updates</Button>}>
                                    <label htmlFor="type">Type</label>
                                    <Field name="type" component="input" type="text" placeholder="Repair? Request? FYI?" />
                                    <label htmlFor="message">Message</label>
                                    <Field name="message" component="input" type="text" />
                                    <Button onClick={() => sendUpdateToManager(props)}>Send Update!</Button>
                                </Modal>

                                :
                                <Modal header={props.address} trigger={<Button>Apply</Button>}>
                                <label htmlFor="pets">Pets</label>
                                 <Field name="pets" component="input" type="text" />

                                 <label htmlFor="criminalRecord">Criminal Record</label>
                                 <Field name="criminalRecord" component="input" type="text" />

                                 <label htmlFor="creditScore">Credit Score</label>
                                 <Field name="creditScore" component="input" type="text" />

                                 <label htmlFor="adults">Adults</label>
                                 <Field name="adults" component="input" type="text" />

                                 <label htmlFor="kids">Children</label>
                                 <Field name="kids" component="input" type="text" />
                                 <Button onClick={() => sendApplication(props)}>Send Application</Button>             
                                </Modal>

                            }

                            {   props.renting === "true" ?
                            <React.Fragment>
                                <Modal header={props.address} trigger={<Button>Check Updates From Manager</Button>}>
                                <Button onClick={() => seenUpdates(props.updates)}>Mark Updates As Seen</Button>
                                    {
                                        props.updates.length > 0 ?
                                        props.updates.map(renderAllUpdates => (
                                            <TenantUpdatesCard 
                                            key={renderAllUpdates.message}
                                            type={renderAllUpdates.type}
                                            message={renderAllUpdates.message}
                                            status={renderAllUpdates.status}
                                            seenUpdate={renderAllUpdates.seen}
                                           
                                            />
                                        ))
                                        :
                                        null
                                    }
                                </Modal>
                                <Badge className="red" newIcon>{checkIfNonPendingUpdatesHaveBeenMarkedSeen(props.updates)}</Badge>
                            </React.Fragment>
                                :
                                null
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(reduxForm({
    form: 'tenantApplicationForm' // a unique identifier for this form
})(TenantPropertyCard));
