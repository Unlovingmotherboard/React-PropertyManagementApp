import React from "react";
import { Row, Col, Card, Button, Chip } from "react-materialize"
import { withRouter } from 'react-router-dom';


// //API
import API from "../../../utils/API";

//REDUX IMPORTS 
import { connectingToHerpestidaeOrNahFam } from "../../../redux/actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getDate } from "date-fns";

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            connectingToHerpestidaeOrNahFam,
        },
        dispatch
    );



function acceptFYI(props) {
    console.log("Accepting FYI!");

    const sendDataForUpdates = {}

    sendDataForUpdates.propertyID = props.propertyID;
    sendDataForUpdates.message = props.message;
    sendDataForUpdates.type = props.type;
    sendDataForUpdates.acceptDenySeen = "Aknowledged";

    console.log(sendDataForUpdates)

    props.connectingToHerpestidaeOrNahFam(true);
    API.changeStatusOfUpdates(sendDataForUpdates).then(res => console.log(res)).catch(err => console.log(err))
}

function denyRequest(props) {
    console.log("Denying request")

    const sendDataForUpdates = {}

    sendDataForUpdates.propertyID = props.propertyID;
    sendDataForUpdates.message = props.message;
    sendDataForUpdates.type = props.type;
    sendDataForUpdates.acceptDenySeen = "Deny";

    console.log(sendDataForUpdates)

    props.connectingToHerpestidaeOrNahFam(true);
    API.changeStatusOfUpdates(sendDataForUpdates).then(res => console.log(res)).catch(err => console.log(err))

}

function acceptRequest(props) {
    console.log("Accepting request")

    const sendDataForUpdates = {}

    sendDataForUpdates.propertyID = props.propertyID;
    sendDataForUpdates.message = props.message;
    sendDataForUpdates.type = props.type;
    sendDataForUpdates.acceptDenySeen = "Accept";

    console.log(sendDataForUpdates)

    props.connectingToHerpestidaeOrNahFam(true);
    API.changeStatusOfUpdates(sendDataForUpdates).then(res => console.log(res)).catch(err => console.log(err))

}

//MOMENT 
const moment = require('moment');

const setTimeStamp = (timestamp) => {
    return moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
}


function ManagerUpdatesCard(props) {
    return (
        <div className="container-fluid">
            <Row>
                <Col m={6} s={12} l={12} xl={12}>
                    <Card>
                        <div>
                            <h5>{props.type}</h5>
                        </div>
                        <div>
                        <p>{setTimeStamp(props.timestamp)}:</p>
                        <p>{props.message}</p>
                        </div>
                        
                        {
                            props.status !== "Pending" ?
                                <Chip>
                                    {props.status}
                                </Chip>
                                :
                                props.type === "FYI"
                                    ?
                                    <Button waves="light" modal="close" onClick={() => acceptFYI(props)}>Got It!</Button>
                                    :
                                    <React.Fragment><Button waves="red" modal="close" onClick={() => denyRequest(props)}>Denny</Button>
                                        <Button waves="light" modal="close" onClick={() => acceptRequest(props)}>Accept</Button></React.Fragment>
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

ManagerUpdatesCard = connect(
    null,
    mapDispatchToProps
)(ManagerUpdatesCard);


export default withRouter(connect()(ManagerUpdatesCard));