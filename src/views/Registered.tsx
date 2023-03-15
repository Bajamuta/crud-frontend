import React from "react";
import {useNavigate} from "react-router-dom";

export default function Registered() {

    const navigate = useNavigate();

    return (<div className="">
        <h2>Registered</h2>
        <p>You have been successfully registered!</p>
        <button className="btn btn-primary btn-lg mb-5"
                onClick={() => navigate("/login")}>
            Go to login page
        </button>
    </div>);
}
