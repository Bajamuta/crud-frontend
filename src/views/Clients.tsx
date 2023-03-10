import React, {useEffect, useState} from "react";
import {ActionTypeResponse, ClientResponse, ObjectContext} from "../../helpers/interfaces-responses";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-modal';
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import {ClientRequest} from "../../helpers/interfaces-requests";
import EditClient from "./EditClient";

export default function Clients() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [clients, setClients] = useState<ClientResponse[]>([]);
    const [actionTypes, setActionTypes] = useState<ActionTypeResponse[]>();
    const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(null);
    const [showClientDetails, setShowClientDetails] = useState<boolean>(false);
    const [showClientEdit, setShowClientEdit] = useState<boolean>(false);

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
    const createClient = (data: ClientRequest) => {
        return apiService.createClient({...data});
    }
    const editClient = (data: ClientRequest) => {
        if(selectedClient)
        {
            apiService.updateClient(selectedClient?._id, data)
                .then(
                    (response: AxiosResponse<ClientResponse>) => {
                        setShowClientEdit(false);
                        setSelectedClient(null);
                        getAllClients();
                    }
                )
                .catch((error) => console.error("An error has occurred:", error));
        }
    }

    const deleteAction = (id: string) => {
        return apiService.deleteAction(id);
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
    const openEditClient = () => {
        setShowClientDetails(false);
        setShowClientEdit(true);
    }
    const refreshDetails = () => {
        if (selectedClient)
        {
            apiService.getSingleClient(selectedClient._id)
                .then((response: AxiosResponse<ClientResponse>) => {
                    if (response.status === 200) {
                        setSelectedClient(response.data);
                    }
                    else {
                        console.log(response);
                    }
                })
                .catch((error) => console.error("An error has occurred:", error));
        }
    }
    const refreshClientsList = () => {
        getAllClients();
    }
    const closeClientDetails = () => {
        setShowClientDetails(false);
        setSelectedClient(null);
    }
    const closeClientEdit = () => {
        setShowClientEdit(false);
        setSelectedClient(null);
    }
    useEffect(() => {
        getAllClients();
        getAllActionTypes();
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
            <AddClient refresh={refreshClientsList} createClient={createClient}/>
            <EditClient selectedClient={selectedClient} editClient={editClient}
                modalIsOpen={showClientEdit} closeModal={closeClientEdit}/>
            <ClientDetails selectedClient={selectedClient} modalIsOpen={showClientDetails}
                           actionTypes={actionTypes}
                           createAction={apiService.createAction}
                           closeModal={closeClientDetails}
                           refresh={refreshDetails}
                           deleteAction={deleteAction}
                           openEditClient={openEditClient}
                           jwt_token={objectContext.loggedUser.jwt_token}/>
        </div>
    );
}
