import React, {useEffect} from "react";
import axios from "axios";
import '../styles/Home.css';
import {useMainContext} from "../App";
export default function Home() {
    const {loggedUser, actionTypes} = useMainContext();
    axios.defaults.headers.common['Authorization'] = "Bearer " + (loggedUser.jwt_token || '');

    useEffect(() => {
    }, []);

    return (
        <div className="">
            {!!loggedUser?.jwt_token && <p>Logged as {loggedUser.username}</p>}
            <h2>Welcome!</h2>
            <p>Please select page from menu on the left.</p>
        </div>
    );
}
