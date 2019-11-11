import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Dropdown } from "react-materialize"
import "./style.css"

function NavBar() {
    return (
        <div>
            <Navbar alignLinks="right">
                <Link to="/">Home Page</Link>

                <Dropdown trigger={<a>Sign Up</a>}>
                    <Link to="/SignUp">Tenant Sign Up</Link>
                    <Link to="/Manager/SignUp">Manager Sign Up</Link>
                </Dropdown>

                <Dropdown trigger={<a>Login</a>}>
                    <Link to="/SignIn">Tenant Login</Link>
                    <Link to="/Manager/SignIn">Manager Login</Link>
                </Dropdown>
            </Navbar>
        </div>
    );

}

export default NavBar;