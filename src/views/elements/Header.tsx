import React from "react";
import '../../styles/Header.css';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="Header">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col">
                        <Link to={"/"}>
                            <h1>CRM Panel Control</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
