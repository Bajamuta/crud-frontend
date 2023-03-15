import React from "react";
import {useMainContext} from "../../App";
import {Outlet} from "react-router-dom";

export default function UserIndex() {
    const context = useMainContext();
    return (
        <div>
            <Outlet context={context}/>
        </div>
    );
}
