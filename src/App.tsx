import React, {useEffect, useState} from 'react';
import './App.css';
import {ActionTypeResponse, LoginResponse, UserResponse} from "./helpers/interfaces-responses";
import Header from "./views/elements/Header";
import {Outlet, useOutletContext} from "react-router-dom";
import Footer from "./views/elements/Footer";
import ApiService from "./services/ApiService";
import axios, {AxiosResponse} from "axios";
import AuthService from "./services/AuthService";
import Navbar from "./views/elements/Navbar";

type ContextType = {
    loggedUser: LoginResponse,
    userDetails: UserResponse,
    setLoggedUser: (data: LoginResponse) => void,
    setUserDetails: (user: UserResponse) => void,
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
    const [userDetails, setUserDetails] = useState<UserResponse>();
    const [loggedUser, setLoggedUser] = useState<LoginResponse>(initLocal.length > 0 ? JSON.parse( initLocal) : {jwt_token: ''});
    const [actionTypes, setActionTypes] = useState<ActionTypeResponse[]>();

    axios.defaults.headers.common['Authorization'] = "Bearer " + (loggedUser.jwt_token || '');

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

    const getUserDetails = () => {
        if (loggedUser?.jwt_token)
        {
            apiService.getSingleUser(loggedUser.id)
                .then(
                    (response: AxiosResponse<UserResponse, any> | undefined) => {
                        if (response)
                        {
                            if (!response?.data.error) {
                                setUserDetails(response.data);
                            } else {
                                console.error('An error has occurred during retrieving logged user\'s details', response.data.error);
                            }
                        }
                    }
                )
                .catch((error) => console.error("An error has occurred", error));
        }
    }

    useEffect(() => {
        getAllActionTypes();
        getUserDetails();
    }, []);

/*TODO sprawdź ważność tokenu "time to leave"*/
return (
    <div className="container-fluid" id="appElement">
        <div className="row">
            <aside className="AppAside col-md-2 bg-light sidebar">
                <Header/>
                <Navbar loggedUser={loggedUser}/>
            </aside>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <Outlet context={{loggedUser, setLoggedUser, userDetails, setUserDetails, actionTypes, apiService, authService}}/>
                <Footer/>
            </main>
        </div>
    </div>
);
}

