import React from "react";
import {LoginResponse} from "../../helpers/interfaces-responses";
import {ProtectedRoute, NotLoggedRoute} from "../../helpers/helpers";
import '../../styles/Navbar.css';
import {Nav} from "react-bootstrap";

interface NavbarProps {
    loggedUser: LoginResponse
}

export default function Navbar(props: NavbarProps) {

    return (
        <nav className="navbar navbar-expand-lg" id="main-navbar">
            <div className="container">
                <div className="sidebar-sticky">
                    <Nav defaultActiveKey="1" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="1" href="/">Home</Nav.Link>
                        </Nav.Item>
                        <ProtectedRoute loggedUser={props.loggedUser}>
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/user">User</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="2" href="/clients">
                                        Clients
                                    </Nav.Link>
                                    <Nav className="NavbarSide flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="3" href="/clients">
                                                All clients
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="4" href="/clients/add">
                                                Add new client
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="5" href="/actions">Actions</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="0" href="/logout">Logout</Nav.Link>
                                </Nav.Item>
                        </>
                        </ProtectedRoute>
                        <NotLoggedRoute loggedUser={props.loggedUser}>
                            <>
                                <Nav.Item>
                                    <Nav.Link eventKey="8" href="/login">Log in</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="9" href="/signup">Sign up</Nav.Link>
                                </Nav.Item>
                            </>
                        </NotLoggedRoute>
                    </Nav>
                </div>
            </div>
        </nav>
    );
}
