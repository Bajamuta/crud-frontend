import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import './Home.css';
import {useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {datePipe} from "../../helpers/dateHelper";
import {CityResponse, ObjectContext} from "../../helpers/interfaces-responses";
export default function Home() {

    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();

   axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token || '');

    useEffect(() => {
    }, []);

    return (
        <div className="HomeContainer">
            {!!objectContext.loggedUser?.jwt_token && <p>Logged as {objectContext.loggedUser.username}</p>}
           {/* <h2>Our events:</h2>*/}
            <div className="ListContainer">
                <ul>
                    {/*{
                        events?.map(
                            (event: EventResponse) => {
                                return (<li key={event._id}>
                                            {event.name} {event.description} {datePipe(event.date)}
                                        </li>);
                            }
                        )
                    }*/}
                </ul>
            </div>
        </div>
    );
}
