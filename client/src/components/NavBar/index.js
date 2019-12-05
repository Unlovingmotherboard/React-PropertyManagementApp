import React from "react";
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Dropdown, Button } from "react-materialize"
import "./style.css"


//API
import API from "../../utils/API";


import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";

function NavBar(props) {
    const logoutManager = () => {
        API.logoutManager(localStorage.getItem("token")).then(() => {
            props.logout();
            localStorage.removeItem('token')
            localStorage.removeItem('type');
            localStorage.removeItem('username');
            props.history.push("/")
        }).catch(err => console.log(err));
    }

    const logoutTenant = () => {
        API.logoutTenant(localStorage.getItem("token")).then(() => {
            props.logout();
            localStorage.removeItem('token')
            localStorage.removeItem('type');
            props.history.push("/")
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <Navbar alignLinks="right">
                <Link to="/">Home Page</Link>
                {
                    props.type === "Tenant" ?
                        <Dropdown trigger={<a>Tentnat</a>}>
                            {
                                <React.Fragment>
                                <Link to="/Tenant">Tenant Page</Link>
                                <Link to="/" onClick={logoutTenant}>Logout</Link>
                                </React.Fragment>
                            }
                        </Dropdown> :
                        props.type === 'Manager' ?
                            <Dropdown trigger={<a>Manager</a>}>
                                {
                                    <React.Fragment>
                                        <Link to="/Manager">Manager Page</Link>
                                        <Link to="/" onClick={logoutManager}>Logout</Link>
                                        {/* <Button >Logout</Button> */}
                                    </React.Fragment>


                                }
                            </Dropdown>
                            :

                            <React.Fragment>
                                <Dropdown trigger={<a>Navigate</a>}>

                                    <React.Fragment>
                                        <Link to="/Login">Tenant Login</Link>
                                        <Link to="/Manager/Login">Manager Login</Link>
                                        <Link to="/SignUp">Tenant Sign Up</Link>
                                        <Link to="/Manager/SignUp">Manager Sign Up</Link>
                                    </React.Fragment>

                                </Dropdown>  
                            </React.Fragment>

                }
            </Navbar>
        </div>
    );
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            logout,
        },
        dispatch
    );

export default NavBar = withRouter(connect(
    null,
    mapDispatchToProps
)(NavBar));

