import React, {useEffect, useState} from "react";
import {ActionTypeResponse, ClientResponse} from "../../helpers/interfaces-responses";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios";
import {Button} from "react-bootstrap";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import {ClientRequest} from "../../helpers/interfaces-requests";
import EditClient from "./EditClient";
import {useMainContext} from "../App";

export default function Clients() {
    const {loggedUser, setLoggedUser, actionTypes, apiService, authService} = useMainContext();
    const [clients, setClients] = useState<ClientResponse[]>([]);
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
        getAllClients();
    }
    const closeClientEdit = () => {
        setShowClientEdit(false);
        setSelectedClient(null);
    }
    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div className="Container">
            <h3>Clients</h3>
            <table>
                <thead>
                <tr>
                    <th scope="col">Lp.</th>
                    <th scope="col">First name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Is company</th>
                    <th scope="col"></th>
                </tr>

                </thead>
                <tbody>
                {clients?.map(
                    (client: ClientResponse) => {
                        return (
                        <tr key={client._id}>
                            <th scope="row">{client._id}</th>
                            <td>{client.firstname}</td>
                            <td>{client.surname}</td>
                            <td>{client.phone}</td>
                            <td>
                                {client.business && 'YES'}
                                {!client.business && 'NO'}
                            </td>
                            <td className="TableButtons">
                                <Button type="button" variant="danger" onClick={() => deleteClient(client._id)}>Delete</Button>
                                <Button type="button" variant="info" className="ms-3" onClick={() => openClientDetails(client._id)}>Details</Button>
                            </td>
                        </tr>
                        )
                    }
                )}

                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6}>Total: {clients?.length} client(s)</td>
                </tr>
                </tfoot>
            </table>
            <ul>

            </ul>
            <AddClient refresh={refreshClientsList} createClient={createClient}/>
            <EditClient selectedClient={selectedClient} editClient={editClient}
                modalIsOpen={showClientEdit} closeModal={closeClientEdit}/>
            {/*{showClientDetails && <ClientDetails selectedClient={selectedClient} modalIsOpen={showClientDetails}
                            actionTypes={actionTypes}
                            createAction={apiService.createAction}
                            closeModal={closeClientDetails}
                            refresh={refreshDetails}
                            deleteAction={deleteAction}
                            openEditClient={openEditClient}
                            jwt_token={objectContext.loggedUser.jwt_token}/>}*/}
        </div>
    );
}
