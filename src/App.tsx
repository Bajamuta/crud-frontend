import React, {useEffect, useState} from 'react';
import './App.css';
import {ActionTypeResponse, ClientResponse, LoginResponse} from "../helpers/interfaces-responses";
import Header from "./views/Header";
import {Link, Outlet, useOutletContext} from "react-router-dom";
import Footer from "./views/Footer";
import ApiService from "./services/ApiService";
import axios, {AxiosResponse} from "axios";
import AuthService from "./services/AuthService";

type ContextType = {
    loggedUser: LoginResponse,
    setLoggedUser: (data: LoginResponse) => void,
    actionTypes: ActionTypeResponse[],
    apiService: ApiService,
    authService: AuthService
}

export function useMainContext() {
    return useOutletContext<ContextType>();
}

export default function App() {
    const initLocal = localStorage.getItem("loggedUser") || '';
    const apiService = new ApiService();
    const authService = new AuthService();
    const [loggedUser, setLoggedUser] = useState<LoginResponse>(initLocal.length > 0 ? JSON.parse( initLocal) : {jwt_token: ''});
    const [actionTypes, setActionTypes] = useState<ActionTypeResponse[]>();
    const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(null);

    axios.defaults.headers.common['Authorization'] = "Bearer " + (loggedUser.jwt_token || '');
    /*TODO wystarczy raz?*/

    const getAllActionTypes = () => {
        apiService.getAllActionTypes().then(
            (response: AxiosResponse<ActionTypeResponse[]>) => {
                if (response.status === 200)
                {
                    setActionTypes(response.data);
                }
            }
        )
            .catch((e) => console.error(e));
    }

    useEffect(() => {
        getAllActionTypes();
    }, []);

/*TODO authprovider + sprawdź ważność tokenu "time to leave"*/
return (
    <div className="App" id="appElement">
        <Header/>
        <nav className="AppNavbar">
            <ul>
                <li>
                    <Link to={"/"}>HOME</Link>
                </li>
                <li>
                    <Link to={"/clients"}>CLIENTS</Link>
                </li>
                <li>
                    <Link to={"/actions"}>ACTIONS</Link>
                </li>
                {!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/login"}>LOG IN</Link>
                    </li>
                }
                {!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/signup"}>SIGN UP</Link>
                    </li>
                }
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/logout"}>LOG OUT</Link>
                    </li>
                }
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/user"}>USER</Link>
                    </li>
                }
            </ul>
        </nav>
        <Outlet context={{loggedUser, setLoggedUser, actionTypes, apiService, authService}}/>
        <Footer/>
    </div>
);
}

