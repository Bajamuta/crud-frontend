import React, {useEffect, useState} from "react";
import {ClientResponse, ObjectContext} from "../../helpers/interfaces-responses";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios/index";
import {Button} from "react-bootstrap";
export default function Clients() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [clients, setClients] = useState<ClientResponse[]>();
    const [showNewClientForm, setShowNewClientForm] = useState<boolean>(false);

    const getAllClients = () => {
        apiService.getAllClients().then(
            (response: AxiosResponse<ClientResponse[]>) => {
                if (response.status === 200)
                {
                    setClients(response.data);
                }
            }
        )
            .catch((e) => console.error(e));
    }

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div className="Container">
            <h3>Clients</h3>
            <ul>
                {clients?.map(
                    (client: ClientResponse) => {
                        return (<li key={client._id}>
                            {client.clientPerson.firstname} <Button type="button" variant="danger">Delete</Button>
                        </li>)
                    }
                )}
            </ul>
            <Button type="button" variant="primary">Add</Button>
        </div>
    );
}
