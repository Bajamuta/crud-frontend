import React, {useEffect} from "react";
import axios from "axios";
import '../../styles/Home.css';
import {useMainContext} from "../../App";
import {ProtectedRoute} from "../../helpers/helpers";
export default function Home() {
    const {loggedUser} = useMainContext();
    axios.defaults.headers.common['Authorization'] = "Bearer " + (loggedUser.jwt_token || '');

    useEffect(() => {
    }, []);

    return (
        <div className="">
            <h2>Welcome!</h2>
            <ProtectedRoute loggedUser={loggedUser}>
                <p>You are logged as {loggedUser.username}.</p>
            </ProtectedRoute>
            <p>Please select page from menu on the left.</p>
        </div>
    );
}
