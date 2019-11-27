import React from "react";
import { Row, Col, Modal, Button, Badge, RadioGroup, MediaBox, Carousel, Chip } from "react-materialize"

//REDUX FORMS
import { Field, reduxForm } from 'redux-form';

//REACT ROUTER
import { withRouter } from 'react-router-dom';

//REDUX STORE   
import store from "../../../redux/store";

//COMPONENTS
import ManagerApplicationsCard from "../Applications/ManagerSeeApplications"
import ManagerUpdatesCard from "../Updates/ManagerSeeTenantUpdates"

//IMPORT CSS
import "./managerPropertyCardStyle.css"

//API
import API from "../../../utils/API";


//REDUX IMPORTS 
import { showConfirmationModal, connectingToHerpestidaeOrNahFam } from "../../../redux/actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            showConfirmationModal,
            connectingToHerpestidaeOrNahFam
        },
        dispatch
    );



const confirmRemoveIMG = (props) => {
    props.showConfirmationModal(true)
    console.log("You sure?")
}




const removeImage = (e, props) => {

    let removeImgObj = {};

    removeImgObj.imgID = e.target.getAttribute("id").trim();
    removeImgObj.propertyID = props.propertyID;

    props.connectingToHerpestidaeOrNahFam(true)
    API.managerDeleteImages(removeImgObj).then(res => console.log(res)).catch(err => console.log(err));
}

const onChange = (e, props) => {
    let files = e.target.files;
    let imgDataToHerpestidae = {};

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
        imgDataToHerpestidae.imgDta = { file: e.target.result }
        imgDataToHerpestidae.propertyID = props.propertyID;
        props.connectingToHerpestidaeOrNahFam(true)
        API.uploadPropertyImages(imgDataToHerpestidae).then(res => console.log(res)).catch(err => console.log(err));

    }
}










function searchGetAllNonPendingUpdates(nameKey, myArray) {
    let newArray = []

    for (var i = 0; i < myArray.length; i++) {

        if (myArray[i].propertyID === nameKey && myArray[i].status !== "Pending") {
            newArray.push(myArray[i])
        }
    }
    return newArray.length;
}

function getAllPendingUpdates(nameKey, myArray) {
    let newArray = []

    for (var i = 0; i < myArray.length; i++) {

        if (myArray[i].propertyID === nameKey && myArray[i].status === "Pending") {
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



const getImgFromBase64 = (propertyImgs) => {

    let imagesArray = []

    if (propertyImgs.length > 0) {
        imagesArray.push(propertyImgs[0].img64.file);
        return imagesArray;
    }

    else {
        return ["http://eliteconnectre.com/wp-content/themes/eliteconnectrealestate/images/propertyPlaceholder.png"]
    }

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
        <div className="container z-depth-2">
            <div className="card">
                <div className="card-content white-text center-align">
                    <Row className="blue accent-1">
                        <Col s={12} m={12} l={12} xl={12}>
                            <span className="card-title">{props.address}, {props.city}, {props.state} {props.postalCode} </span>
                            {
                                getAllPendingUpdates(props.propertyID, props.updates) > 0
                                    ?
                                    <Badge className="red" newIcon>{getAllPendingUpdates(props.propertyID, props.updates)}</Badge>
                                    :
                                    null
                            }

                            {
                                checkIfPropertyHasApplications(props.propertyID, props.applications).length > 0
                                    ?
                                    <div className="center-align">
                                        <p className="applicationsBadge">{checkIfPropertyHasApplications(props.propertyID, props.applications).length} New Applications</p>
                                    </div>
                                    :
                                    null
                            }
                        </Col>
                    </Row>



                    <Row>

                        {/*COLUMN FOR PROPERTY INFO*/}
                        <Col s={8} m={8} l={8} xl={8} className="propertyInfoArea z-depth-3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus venenatis felis, in ultrices nunc fermentum sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum leo urna, facilisis vitae lacinia vitae, tincidunt vitae ex. Suspendisse ut risus tincidunt, consequat dui quis, aliquam quam. Nam eu dignissim neque. Donec vitae varius justo. Donec eleifend consectetur mattis. Curabitur mauris est, finibus et aliquet eget, aliquet at enim.

Nulla efficitur lacinia purus, id varius ex. Sed consectetur hendrerit molestie. Ut sed vulputate metus. Fusce sit amet varius risus. Nunc tincidunt felis at suscipit cursus. Aliquam orci libero, elementum ac mauris sed, hendrerit dignissim nisi. Donec in metus in lacus eleifend gravida. Sed nec aliquet felis, quis egestas libero. Pellentesque quis leo iaculis, egestas lorem eget, bibendum nunc. In egestas faucibus feugiat. Aenean ac finibus velit.</p>
                        </Col>

                        {/*COLUMN FOR IMAGES*/}
                        <Col s={3} m={3} l={3} xl={3} id="imagesColumn" className="z-depth-3">

                            <Row>
                                {
                                    props.vacant === true ?
                                        <Chip>
                                            Vacant
                                    </Chip>
                                        :
                                        <Chip>
                                            Not Vacant
                                    </Chip>
                                }
                            </Row>

                            <Row>
                                <MediaBox width="200" alt="property" >
                                    <img src={getImgFromBase64(props.propertyImgs)[0]}></img>
                                </MediaBox>

                                <Modal header="All Photos" trigger={<Button>All Photos</Button>}>
                                    <Row>
                                        {
                                            props.propertyImgs.map(allImages => (
                                                <React.Fragment key={allImages.id}>
                                                    <div className="allPropertyImageDiv">
                                                        <img className="responsive-img" src={allImages.img64.file} ></img>
                                                        <Button id={allImages.id} onClick={(e) => removeImage(e, props)}>Remove</Button>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </Row>

                                    <Row>
                                        <Modal header="Add Property" trigger={<Button>Upload Files</Button>}>
                                            <input multiple type="file" name="file" onChange={(e) => onChange(e, props)}></input>
                                        </Modal>
                                    </Row>
                                </Modal>
                            </Row>

                            <Row>
                                <MediaBox>
                                    <img src="https://www.ekcreditunion.co.uk/wp-content/uploads/2018/02/Blank-Silhouette-768x768.jpg" width="200" alt="tenant" />
                                </MediaBox>
                            </Row>


                        </Col>
                    </Row>

                    <Row className="">
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

ManagerPropertyCard = connect(
    null,
    mapDispatchToProps
)(ManagerPropertyCard);

export default withRouter(reduxForm({
    form: 'tenantApplicationForm' // a unique identifier for this form
})(ManagerPropertyCard));