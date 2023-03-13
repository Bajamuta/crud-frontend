import React, {useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import "./LogOut.css";
import {ObjectContext} from "../../helpers/interfaces-responses";
import {useMainContext} from "../App";

export default function LogOut() {
    const {loggedUser, setLoggedUser, actionTypes, apiService, authService} = useMainContext();
    useEffect(() => {
        localStorage.removeItem("loggedUser");
        setLoggedUser({jwt_token: "", username: "", ttl: "", id: "", error: ""});
    });

    return (<div className="Container">
        <h2>Log Out</h2>
        <p>You have been successfully logged out.</p>
    </div>);
}
