import React from "react";
import {Link} from "react-router-dom";
import {LoginResponse} from "../../helpers/interfaces-responses";
import '../styles/Navbar.css';

interface NavbarProps {
    loggedUser: LoginResponse
}

export default function Navbar(props: NavbarProps) {
    return (
        <nav className="navbar navbar-expand-lg" id="main-navbar">
            <div className="container">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/clients"}>CLIENTS</Link>
                            <ul className="nav flex-column NavbarSide">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/clients"}>ALL CLIENTS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/clients/add"}>ADD NEW CLIENT</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/actions"}>ACTIONS</Link>
                        </li>
                        {!props.loggedUser?.jwt_token &&
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>LOG IN</Link>
                            </li>
                        }
                        {!props.loggedUser?.jwt_token &&
                            <li className="nav-item">
                                <Link className="nav-link" to={"/signup"}>SIGN UP</Link>
                            </li>
                        }
                        {!!props.loggedUser?.jwt_token &&
                            <li className="nav-item">
                                <Link className="nav-link" to={"/logout"}>LOG OUT</Link>
                            </li>
                        }
                        {!!props.loggedUser?.jwt_token &&
                            <li className="nav-item">
                                <Link className="nav-link" to={"/user"}>USER</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
