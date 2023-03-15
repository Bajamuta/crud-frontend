import React, {useEffect} from "react";
import "../../styles/LogOut.css";
import {useMainContext} from "../../App";

export default function LogOut() {
    const {setLoggedUser} = useMainContext();
    useEffect(() => {
        localStorage.removeItem("loggedUser");
        setLoggedUser({jwt_token: "", username: "", ttl: "", id: "", error: ""});
    }, []);

    return (<div className="">
        <h2>Log Out</h2>
        <p>You have been successfully logged out.</p>
    </div>);
}
