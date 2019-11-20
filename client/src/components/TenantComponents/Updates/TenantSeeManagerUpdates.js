import React from "react";
import { Row, Col, Card, Button, Chip } from "react-materialize"
import { withRouter } from 'react-router-dom';


// //API
import API from "../../../utils/API";

// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { logout } from "../../redux/actions";
// import store from '../../redux/store';




function TenantUpdatesCard(props) {
    return (
        <div className="container-fluid">
            <Row>
                <Col m={6} s={12} l={12} xl={12}>
                    <Card>

                        <h5>{props.type}</h5>
                        <p>{props.message}</p>

                        <Chip>
                            {props.status}
                        </Chip>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}



export default withRouter(TenantUpdatesCard);


{/* <h5>{props.type}</h5>
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
                    
            } */}