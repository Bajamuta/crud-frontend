import React, {useEffect, useState} from "react";
import {ClientResponse, ObjectContext} from "../../helpers/interfaces-responses";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-modal';
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";

export default function Clients() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [clients, setClients] = useState<ClientResponse[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(null);
    const [showClientDetails, setShowClientDetails] = useState<boolean>(false);

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
    const deleteClient = (id: string) => {
        apiService.deleteClient(id)
            .then((response: AxiosResponse<Response>) => {
                if (response.status === 200) {
                    getAllClients();
                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => console.error("An error has occurred:", error));
    }
    const openClientDetails = (id: string) => {
        apiService.getSingleClient(id)
            .then((response: AxiosResponse<ClientResponse>) => {
                if (response.status === 200) {
                    setSelectedClient(response.data);
                    setShowClientDetails(true);
                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => console.error("An error has occurred:", error));
    }
    const refresh = () => {
        getAllClients();
    }
    const closeClientDetails = () => {
        setShowClientDetails(false);
        setSelectedClient(null);
    }
    useEffect(() => {
        getAllClients();
    }, []);

    /*TODO widok pojedynczego klienta + dopiero tam możliwość edycji; możliwość usuwania akcji z poziomu klienta*/

    return (
        <div className="Container">
            <h3>Clients</h3>
            <ul>
                {clients?.map(
                    (client: ClientResponse) => {
                        return (<li key={client._id}>
                            <span className="me-2">{client.firstname} {client.surname} {client.email}</span>
                            <Button type="button" variant="danger" onClick={() => deleteClient(client._id)}>Delete</Button>
                            <Button type="button" variant="info" className="ms-3" onClick={() => openClientDetails(client._id)}>Details</Button>
                        </li>)
                    }
                )}
            </ul>
            <AddClient refresh={refresh}/>
            <ClientDetails selectedClient={selectedClient} modalIsOpen={showClientDetails} closeModal={closeClientDetails}/>
        </div>
    );
}
