import React from "react";
import { Button, Chip } from "react-materialize"
import { withRouter } from 'react-router-dom';


// //API
import API from "../../../utils/API";

// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { logout } from "../../redux/actions";
// import store from '../../redux/store';

function acceptFYI(props) {
    console.log("Accepting FYI!");

    const sendDataForUpdates = {}

    sendDataForUpdates.propertyID = props.propertyID;
    sendDataForUpdates.message = props.message;
    sendDataForUpdates.type = props.type;
    sendDataForUpdates.acceptDenySeen = "Aknowledged";

    API.changeStatusOfUpdates(sendDataForUpdates).then(res => console.log(res)).catch(err => console.log(err))
}

function denyRequest(props) {
    console.log("Denying request")

    const sendDataForUpdates = {}

    sendDataForUpdates.propertyID = props.propertyID;
    sendDataForUpdates.message = props.message;
    sendDataForUpdates.type = props.type;
    sendDataForUpdates.acceptDenySeen = "Deny";

    API.changeStatusOfUpdates(sendDataForUpdates).then(res => console.log(res)).catch(err => console.log(err))

}

function acceptRequest(props) {
    console.log("Accepting request")

    const sendDataForUpdates = {}

    sendDataForUpdates.propertyID = props.propertyID;
    sendDataForUpdates.message = props.message;
    sendDataForUpdates.type = props.type;
    sendDataForUpdates.acceptDenySeen = "Accept";

    API.changeStatusOfUpdates(sendDataForUpdates).then(res => console.log(res)).catch(err => console.log(err))

}


function ModalUpdateCard(props) {
    console.log(props)
    return (
        <div className="container">
            <h5>{props.type}</h5>
            <p>{props.message}</p>

            {
                props.managerOrTenant === "Manager" ?

                null
                    
                        :

                        props.type === "FYI" ?
                        <Button waves="light" modal="close" onClick={() => acceptFYI(props)}>Got It!</Button>
                        :

                        <React.Fragment><Button waves="red" modal="close" onClick={() => denyRequest(props)}>Denny</Button>
                            <Button waves="light" modal="close" onClick={() => acceptRequest(props)}>Accept</Button></React.Fragment>
            }



            {

                props.managerOrTenant === "Tenant" ?
                <React.Fragment>

                <Chip>
                    {props.status}
                </Chip>

            </React.Fragment>
                    //YOU CAN ADD BUTTONS FOR TENANT NOW

                    :
                null
                    
            }

        </div>

    )
}



export default withRouter(ModalUpdateCard);