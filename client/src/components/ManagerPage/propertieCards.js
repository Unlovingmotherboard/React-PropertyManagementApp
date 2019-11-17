import React from "react";
import { Row, Col, Modal, Button, Badge } from "react-materialize"

//REDUX FORMS
import { Field, reduxForm } from 'redux-form';

//REACT ROUTER
import { withRouter } from 'react-router-dom';

//REDUX STORE   
import store from "../../redux/store";

//COMPONENTS
import ModalUpdateCard from "./updates/modalUpdates";
import ModalApplicationCard from "./updates/applicationModal"

//API
import API from "../../utils/API";

const sendApplication = (props) => {
    // event.preventDefault();
    const applicationToHerpestidae = store.getState().form.tenantApplicationForm.values;

    applicationToHerpestidae.address = props.address;
    applicationToHerpestidae.token = store.getState().loggedReducer.token;
    applicationToHerpestidae.userName = store.getState().loggedReducer.username;
    applicationToHerpestidae.managerID = props.managerID;

    API.sendApplicationToDatabase(applicationToHerpestidae).then(res => console.log(res)).catch(err => console.log(err));
}



function searchLength(nameKey, myArray) {
    let newArray = []

    for (var i = 0; i < myArray.length; i++) {

        if (myArray[i].propertyID === nameKey) {
            newArray.push(myArray[i])
        }
    }
    return newArray.length;
}

function searchGetAllApps(nameKey, myArray) {
    let newArray = []

    for (var i = 0; i < myArray.length; i++) {

        if (myArray[i].propertyID === nameKey) {
            newArray.push(myArray[i])
        }
    }
    return newArray;
}


function PropertyCard(props) {
    return (
        <div className="container">
            <Row>
                <Col s={12} m={12} xl={12}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title center-align">{props.address}, {props.city}, {props.state} {props.postalCode} </span>
                        </div>
                        {
                            props.renting === "true" && props.managerORTenant === "Tenant"
                                ?
                                <Modal updates={props.updates} header={props.address} trigger={<Button>Add Updates</Button>}>
                                </Modal>
                                :
                                props.renting === "false" && props.managerORTenant === "Tenant"
                                    ?
                                    <Modal header="Apply Now!" trigger={<Button>Apply</Button>}>
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
                                    :
                                    props.managerORTenant === "Manager" && props.updates[0]
                                        ?
                                        <Modal header={props.address} trigger={<Button>Updates</Button>}>

                                            {
                                                props.updates[0] ?

                                                    Object.entries(props.updates[0]).map(key =>
                                                        <ModalUpdateCard
                                                            key={key[0]}
                                                            updateID={key[0]}
                                                            whatIsUpdating={key[1]}
                                                        />
                                                    )
                                                    :
                                                    null
                                            }
                                        </Modal>

                                        :

                                        <Modal updates={props.updates} header={props.address} trigger={<Button>Updates</Button>}>

                                            {
                                                <ModalUpdateCard />
                                            }
                                        </Modal>
                        }
                        {

                            props.managerORTenant === "Tenant"
                                ?
                                null
                                :
                                (props.managerORTenant === "Manager" && searchLength(props.propertyID, props.applications) === 0)
                                    ?
                                    <Badge className="red" newIcon>0</Badge>
                                    :
                                    (props.managerORTenant === "Manager" && searchLength(props.propertyID, props.applications) > 0)
                                        ?


                                        <React.Fragment>
                                            <Badge className="red" newIcon>{searchLength(props.propertyID, props.applications)}</Badge>

                                            <Modal header={props.address} trigger={<Button>New Applications</Button>}>{
                                                !(searchGetAllApps(props.propertyID, props.applications)) === null ?
                                                    null
                                                    :
                                                    searchGetAllApps(props.propertyID, props.applications).map(applicationData =>
                                                        <ModalApplicationCard
                                                            key={applicationData._id}
                                                            managerID={applicationData.managerID}
                                                            tenantID={applicationData.tenantID}
                                                            propertyID={applicationData.propertyID}
                                                            pets={applicationData.pets}
                                                            criminalRecord={applicationData.criminalRecord}
                                                            creditScore={applicationData.creditScore}
                                                            adults={applicationData.adults}
                                                            kids={applicationData.kids}
                                                            status={applicationData.status}
                                                        />
                                                    )
                                            }</Modal>
                                        </React.Fragment>
                                        :
                                        null}
                    </div>
                </Col>
            </Row>
        </div>
    )
}


{/* <Collapsible popout>
<CollapsibleItem header="Better safe than sorry. That's my motto." icon={<Icon />}>
Better safe than sorry. That's my motto.
</CollapsibleItem>
<CollapsibleItem header="Yeah, you do seem to have a little 'shit creek' ac…" icon={<Icon />}>
Yeah, you do seem to have a little 'shit creek' action going.
</CollapsibleItem>
<CollapsibleItem header="You know, FYI, you can buy a paddle. Did you not p…" icon={<Icon />}>
You know, FYI, you can buy a paddle. Did you not plan for this contingency?
</CollapsibleItem>
</Collapsible> */}


export default withRouter(reduxForm({
    form: 'tenantApplicationForm' // a unique identifier for this form
})(PropertyCard));




// Object.entries(
//     searchLength(props.propertyID, props.applications)
//     )