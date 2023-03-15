import React from "react";
import {Outlet} from "react-router-dom";
import {useMainContext} from "../../App";
export default function ClientIndex() {
    const context = useMainContext();
    return (
        <div>
            <Outlet context={context}/>
        </div>
    );
}
