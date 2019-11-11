import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from "react-materialize"
import "./style.css"

function NavBar() {
    return (
        <div>
            <Navbar alignLinks="right">
            <Link to="/">Home Page</Link>
            <Link to="/Login">Login</Link>
            </Navbar>
        </div>
    );

}

export default NavBar;