import React from "react";
import { Row, Col, Modal, Button, Badge, RadioGroup } from "react-materialize"

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







function checkIfPropertyHasApplications(propertyID, applicationsArray){
    let applicationstoCardArray = []

    for (var i = 0; i < applicationsArray.length; i++) {
        if (applicationsArray[i].propertyID === propertyID) {
            applicationstoCardArray.push(applicationsArray[i])
        }
    }
    return applicationstoCardArray;
}


function checkIfPropertyHasUpdates(propertyID, updatesArray){
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
            <Row>
                <Col s={12} m={12} xl={12}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title center-align">{props.address}, {props.city}, {props.state} {props.postalCode} </span>

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
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(reduxForm({
    form: 'tenantApplicationForm' // a unique identifier for this form
})(ManagerPropertyCard));












// { //-------------------SHOW APPLICATIONS AND BADGE IF APPLICATIONS EXIST FOR PROPERTY----------TENANT---------//
//     props.renting === "true" && props.managerORTenant === "Tenant"
//         ?
//         <React.Fragment>

//             <Modal header={props.address} trigger={<Button>Add Updates</Button>}>
//                 <label htmlFor="type">Type</label>
//                 <Field name="type" component="input" type="text" placeholder="Repair? Request? FYI?" />

//                 <label htmlFor="message">Message</label>
//                 <Field name="message" component="input" type="text" />
//                 <Button onClick={() => sendUpdateToManager(props)}>Send Update!</Button>
//             </Modal>

//             {

//                 searchLength(props.propertyID, props.updates) === 0
//                     ?
//                     null
//                     :
//                     searchLength(props.propertyID, props.updates) > 0
//                         ?

//                         <React.Fragment>

//                             <Modal header={props.address} trigger={<Button>Check Updates</Button>}>
//                             <Button onClick={() => seenUpdates(props.updates)}>Mark As Seen</Button>

//                             {props.updates.map(updatesToModal => (
//                             <ModalUpdateCard
//                                 key={updatesToModal.message}
//                                 type={updatesToModal.type}
//                                 message={updatesToModal.message}
//                                 status={updatesToModal.status}
//                                 {...props}
//                             />
//                         ))}

//                             </Modal>

//                             {
//                                 searchGetAllNonPendingUpdates(props.propertyID, props.updates) > 0 ?

//                                 <Badge className="red" newIcon>{searchGetAllNonPendingUpdates(props.propertyID, props.updates)}</Badge>

//                                 :

//                                 <Badge className="red" newIcon>0</Badge>

//                             }



//                         </React.Fragment>

//                         :
//                         null

//             }



//         </React.Fragment>

//         :
//         props.renting === "false" && props.managerORTenant === "Tenant"
//             ?
//             <Modal header="Apply Now!" trigger={<Button>Apply</Button>}>
//                 <label htmlFor="pets">Pets</label>
//                 <Field name="pets" component="input" type="text" />

//                 <label htmlFor="criminalRecord">Criminal Record</label>
//                 <Field name="criminalRecord" component="input" type="text" />

//                 <label htmlFor="creditScore">Credit Score</label>
//                 <Field name="creditScore" component="input" type="text" />

//                 <label htmlFor="adults">Adults</label>
//                 <Field name="adults" component="input" type="text" />

//                 <label htmlFor="kids">Children</label>
//                 <Field name="kids" component="input" type="text" />
//                 <Button onClick={() => sendApplication(props)}>Send Application</Button>
//             </Modal>
//             :
//             props.managerORTenant === "Manager" && props.updates.length > 0
//                 ?

//                 <React.Fragment>
//                     <Badge className="red" >{props.updates.length} New Updates!</Badge>
//                     <Modal header={props.address} trigger={<Button>Updates</Button>}>
//                         {props.updates.map(updatesToModal => (
//                             <ModalUpdateCard
//                                 key={updatesToModal.message}
//                                 type={updatesToModal.type}
//                                 message={updatesToModal.message}
//                                 {...props}
//                             />
//                         ))}
//                     </Modal>
//                 </React.Fragment>
//                 :
//                 null
// }


// { //-------------------SHOW APPLICATIONS AND BADGE IF APPLICATIONS EXIST FOR PROPERTY---------MANAGER----------//
//     props.managerORTenant === "Tenant"
//         ?
//         null
//         :
//         (props.managerORTenant === "Manager" && searchLength(props.propertyID, props.applications) === 0)
//             ?
//             null
//             :
//             (props.managerORTenant === "Manager" && searchLength(props.propertyID, props.applications) > 0)
//                 ?


//                 <React.Fragment>
//                     <Badge className="red" newIcon>{searchLength(props.propertyID, props.applications)}</Badge>

//                     <Modal header={props.address} trigger={<Button>New Applications</Button>}>{
//                         !(searchGetAllApps(props.propertyID, props.applications)) === null ?
//                             null
//                             :
//                             searchGetAllApps(props.propertyID, props.applications).map(applicationData =>
//                                 <ModalApplicationCard
//                                     key={applicationData._id}
//                                     managerID={applicationData.managerID}
//                                     tenantID={applicationData.tenantID}
//                                     propertyID={applicationData.propertyID}
//                                     pets={applicationData.pets}
//                                     criminalRecord={applicationData.criminalRecord}
//                                     creditScore={applicationData.creditScore}
//                                     adults={applicationData.adults}
//                                     kids={applicationData.kids}
//                                     status={applicationData.status}
//                                 />
//                             )
//                     }</Modal>
//                 </React.Fragment>
//                 : null
