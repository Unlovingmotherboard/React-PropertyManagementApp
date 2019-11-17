import React from "react";
import { } from "react-materialize"


// //API
// import API from "../../utils/API";

// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { logout } from "../../redux/actions";
// import store from '../../redux/store';

function ModalUpdateCard(props) {
    return (
        <div className="container">
            <h1> {props.updateID} {props.whatIsUpdating}</h1>
        </div>

    )
}



export default ModalUpdateCard;