import React from "react";
import { Row, Col, Modal, Button, Badge, RadioGroup, MediaBox, Carousel, Chip, Tabs, Tab, DatePicker, TextInput } from "react-materialize"

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

//IMPORT VICTORY (DATA CHARTS)
import { VictoryPie } from 'victory';

//REDUX IMPORTS 
import { showConfirmationModal, connectingToHerpestidaeOrNahFam, setDatePicker, setPayment, setExpenses } from "../../../redux/actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getDate } from "date-fns";

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            showConfirmationModal,
            connectingToHerpestidaeOrNahFam,
            setDatePicker,
            setPayment,
            setExpenses
        },
        dispatch
    );




//FUNCTIONS FOR "ADD PAYMENT" FORM
const setDateRedux = (date, props) => {
    props.setDatePicker(date);
}

const setPaymentRedux = (e, props) => {
    props.setPayment(e.target.value);
}

const setExpensesRedux = (e, props) => {
    props.setExpenses(e.target.value);
}

//API CALL FUNCTIONS
const sendToDB = (props) => {
    let profitData = {};

    profitData.payment = store.getState().paymentFormReducer.payment;
    profitData.expenses = store.getState().paymentFormReducer.expenses;
    profitData.timestamp = store.getState().paymentFormReducer.date;
    profitData.tenant = props.tenant;
    profitData.propertyID = props.propertyID;
    profitData.timestamp = store.getState().paymentFormReducer.date;

    console.log("Updating payment history")
    props.connectingToHerpestidaeOrNahFam(true)
    API.managerProfitTest(profitData).then(res => console.log(res)).catch(err => console.log(err))
}


function seenUpdates(updates) {

    const updateToSeen = getAllNonPendingUpdates(updates);
    console.log(updateToSeen)
    if (updateToSeen >= 0) {
        return console.log("Nothing to update");
    }

    API.setUpdatesToSeen(updateToSeen).then(res => console.log(res)).catch(err => console.log(err))
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
        
        API.uploadPropertyImages(imgDataToHerpestidae).then(() =>{props.connectingToHerpestidaeOrNahFam(true)}).catch(err => console.log(err));
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


//SORT PAYMENT HISTORY PER PROPERTY
const sortPaymentHistory = (propertyID, paymentHistoryArray) => {
    let sortedPaymenyHistory = [];

    for (let i = 0; i < paymentHistoryArray.length; i++) {
        if (paymentHistoryArray[i].propertyID === propertyID) {
            sortedPaymenyHistory.push(paymentHistoryArray[i]);
        }
    }
    return sortedPaymenyHistory;
}

//GET DATA FOR VICTORY CHART
const getExpenses = (propertyID, paymentHistoryArray) => {
    let sumOfExpenses = 0;

    for (let i = 0; i < paymentHistoryArray.length; i++) {
        if (paymentHistoryArray[i].propertyID === propertyID) {
            sumOfExpenses = sumOfExpenses + parseInt(paymentHistoryArray[i].expenses.reduce((a, b) => a + b, 0));
        }
    }
    return sumOfExpenses;
}

const getAllPayments = (propertyID, paymentHistoryArray) => {
    let sumOfPayments = 0;
    console.log("Going into property: " + propertyID)

    for (let i = 0; i < paymentHistoryArray.length; i++) {
        if (paymentHistoryArray[i].propertyID === propertyID) {
            sumOfPayments = sumOfPayments + parseInt(paymentHistoryArray[i].payment);
        }
    }
    console.log("Payments:" + sumOfPayments);
    return sumOfPayments;
}

//SUM OF EXPENSES 
const sumExpenses = (expensesArray) => {
    let parsedExpensesArray = [];
    for (var i = 0; i < expensesArray.length; i++) {
        let parseNumber = parseInt(expensesArray[i]);
        parsedExpensesArray.push(parseNumber);
    }
    return parsedExpensesArray.reduce((a, b) => a + b, 0);
}







//MOMENT 
const moment = require('moment');

const getTabDate = (timestamp) => {
    return moment(timestamp).format("MM/DD/YYYY")
}

function ManagerPropertyCard(props) {
    return (
        <div className="propertyCard">
            <div>
                <div className="card roundedEdge">
                    <div className="card-content white-text center-align">
                        <Row className="roundedEdge cardAddressTitle" id="propertyCardHeader">
                            <Col s={12} m={12} l={12} xl={12} className="roundedEdge">
                                <span className="card-title">{props.address}, {props.city}, {props.state} {props.postalCode} </span>
                                {
                                    getAllPendingUpdates(props.propertyID, props.updates) > 0
                                        ?
                                        <div className="center-align">
                                            { //LOGIC FOR UPDATES MODAL RENDERING
                                                checkIfPropertyHasUpdates(props.propertyID, props.updates).length > 0
                                                    ?
                                                    <Modal header={props.address} trigger={<p className="applicationsBadge">{getAllPendingUpdates(props.propertyID, props.updates)} New Updates</p>}>
                                                        {
                                                            checkIfPropertyHasUpdates(props.propertyID, props.updates).map(renderAllUpdates => (
                                                                <ManagerUpdatesCard
                                                                    key={renderAllUpdates.message}
                                                                    type={renderAllUpdates.type}
                                                                    message={renderAllUpdates.message}
                                                                    status={renderAllUpdates.status}
                                                                    timestamp={renderAllUpdates.timestamp}
                                                                    {...props}
                                                                />
                                                            ))
                                                        }
                                                    </Modal>
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        null
                                }

                                {
                                    checkIfPropertyHasApplications(props.propertyID, props.applications).length > 0
                                        ?
                                        <div className="center-align">

                                            {   //LOGIC FOR APPLICATIONS MODAL RENDERING
                                                checkIfPropertyHasApplications(props.propertyID, props.applications).length > 0
                                                    ?
                                                    <Modal header={props.address} trigger={<p className="applicationsBadge">{checkIfPropertyHasApplications(props.propertyID, props.applications).length} New Applications</p>}>
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
                                        :
                                        null
                                }
                            </Col>
                        </Row>


                        <Row className="roundedEdge" id="propertyCardBody">
                            {/*COLUMN FOR PROPERTY INFO*/}
                            <Col s={12} m={12} l={8} xl={8} className="propertyInfoArea" >
                                <div>
                                    <Tabs options={{ swipeable: true }}>

                                        {
                                            sortPaymentHistory(props.propertyID, props.paymentHistory).length > 0 ?

                                                sortPaymentHistory(props.propertyID, props.paymentHistory).map(mapPaymentHistory => (

                                                    <Tab title={getTabDate(mapPaymentHistory.timestamp)}>
                                                        <h3>Payment: ${mapPaymentHistory.payment}</h3>
                                                        <h3>Expenses: ${sumExpenses(mapPaymentHistory.expenses)}</h3>
                                                        <h3>Net Income: ${mapPaymentHistory.payment - sumExpenses(mapPaymentHistory.expenses)}</h3>
                                                    </Tab>

                                                ))
                                                :
                                                <Tab title="No Payment History Yet">
                                                    
                                                </Tab>
                                        }
                                    </Tabs>
                                </div>

                            </Col>
                            {/*COLUMN FOR IMAGES*/}
                            <Col s={12} m={12} l={3} xl={3} id="imagesColumn">

                                <Row className="vacantChip">
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
                                    <MediaBox className="mediaBox" width="200" alt="property" >
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
                                    <MediaBox className="mediaBox" >
                                        <img src="https://www.ekcreditunion.co.uk/wp-content/uploads/2018/02/Blank-Silhouette-768x768.jpg" width="200" alt="tenant" />
                                    </MediaBox>
                                </Row>

                                <Modal header={props.address} trigger={<p>Add Payment</p>}>
                                    <DatePicker onChange={(e) => setDateRedux(e, props)} />
                                    <TextInput onChange={(e) => setExpensesRedux(e, props)} label="Expenses" />
                                    <TextInput onChange={(e) => setPaymentRedux(e, props)} label="Payment" />
                                    <Button onClick={() => sendToDB(props)}></Button>
                                </Modal>
                            </Col>
                        </Row>
                        <div className="chartContainer">

                            {
                                sortPaymentHistory(props.propertyID, props.paymentHistory).length > 0 ?

                                    <VictoryPie
                                    height={400}
                                        data={[
                                            { x: `Expenses: $${getExpenses(props.propertyID, props.paymentHistory)}`, y: getExpenses(props.propertyID, props.paymentHistory) },
                                            { x: `Payments: $${getAllPayments(props.propertyID, props.paymentHistory)}`, y: getAllPayments(props.propertyID, props.paymentHistory) },
                                        ]}

                                        style={{
                                            labels: {
                                            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 0.5
                                            }
                                          }}

                                        innerRadius={50} labelRadius={75} colorScale={["gold", "navy",]} animate={{
                                            duration: 2000
                                          }}
                                    />
                                    :
                                    null
                            }
                        </div>
                    </div>
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