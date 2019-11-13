import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Dropdown, NavItem, Button } from "react-materialize"
import "./style.css"


//API
import API from "../../utils/API";


import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
import store from '../../redux/store';

function NavBar(props) {


    const logoutManager = () => {
        API.logoutManager(localStorage.getItem("token")).then(() => {
            props.logout();
            localStorage.removeItem('token')
            localStorage.removeItem('type');
        }).catch(err => console.log(err));
    }

    const logoutTenant = () => {
        API.logoutTenant(localStorage.getItem("token")).then(() => {
            props.logout();
            localStorage.removeItem('token')
            localStorage.removeItem('type');
        }).catch(err => console.log(err));
    }


    return (
        <div>
            <Navbar alignLinks="right">
                <Link to="/">Home Page</Link>
               {
                   localStorage.getItem('type') === 'Tenant' ?
                   <Dropdown trigger={<a>Tentnat</a>}>
                {
                     <Button onClick={logoutTenant}>Logout</Button>
                }
                </Dropdown> : 
                   localStorage.getItem('type') === 'Manager' ? 
                   <Dropdown trigger={<a>Manager</a>}>
                {
                    <Button onClick={logoutManager}>Logout</Button>
                }
                </Dropdown>
                :

                   <Dropdown trigger={<a>Sign Up</a>}>
                {
                    <React.Fragment>
                                <Link to="/SignUp">Tenant Sign Up</Link>
                                <Link to="/Manager/SignUp">Manager Sign Up</Link>
                                <Link to="/Login">Tenant Login</Link>
                                <Link to="/Manager/Login">Manager Login</Link>
                        </React.Fragment>
                }
                </Dropdown>
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

export default NavBar = connect(
    null,
    mapDispatchToProps
  )(NavBar);