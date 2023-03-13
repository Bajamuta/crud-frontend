import React, {useEffect} from "react";
import axios from "axios";
import './Home.css';
import {useMainContext} from "../App";
export default function Home() {
    const {loggedUser, actionTypes} = useMainContext();
    axios.defaults.headers.common['Authorization'] = "Bearer " + (loggedUser.jwt_token || '');

    useEffect(() => {
    }, []);

    return (
        <div className="HomeContainer">
            {!!loggedUser?.jwt_token && <p>Logged as {loggedUser.username}</p>}
            <div className="ListContainer">
                <ul>
                    {/*{
                        events?.map(
                            (event: EventResponse) => {
                                return (<li key={event._id}>
                                            {event.subject} {event.description} {datePipe(event.date)}
                                        </li>);
                            }
                        )
                    }*/}
                </ul>
            </div>
        </div>
    );
}
