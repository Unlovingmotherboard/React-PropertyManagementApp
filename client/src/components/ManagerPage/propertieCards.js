import React from "react";
import { Row, Col, Modal, Button } from "react-materialize"


//COMPONENTS
import ModalUpdateCard from "./updates/modalUpdates"

// //API
// import API from "../../utils/API";

// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { logout } from "../../redux/actions";
// import store from '../../redux/store';

function PropertyCard(props) {
    return (
        <div className="container">
            <Row>
                <Col s={12} m={12} xl={12}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title center-align">{props.address}, {props.city}, {props.state} {props.postalCode} </span>
                        </div>

                        <Modal updates={props.updates} header={props.address} trigger={<Button>Updates</Button>}>
                            {console.log(props.updates)}

                            {}

                            {Object.entries(props.updates).map(key =>
                                <ModalUpdateCard 
                                key={key[0]}
                                uniqueId={key[0]}
                                whatIsUpdating={key[1]}
                                />
                            )}
                            {/* {props.updates.map(updatesToModal => (
                                console.log(updatesToModal)
                                    // <h1>{updatesToModal}</h1>
                            ))}; */}
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>

    )
}



export default PropertyCard;