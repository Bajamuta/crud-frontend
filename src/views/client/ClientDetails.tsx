import React, {useEffect, useState} from "react";
import {ActionResponse, ActionTypeResponse, ClientResponse} from "../../helpers/interfaces-responses";
import {Button, Form} from "react-bootstrap";
import {AxiosResponse} from "axios";
import {useMainContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import ActionAdd from "../action/ActionAdd";

export default function ClientDetails() {
    const navigate = useNavigate();
    const {clientId} = useParams<string>();
    const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(null);
    const {loggedUser, actionTypes, apiService} = useMainContext();

    /*TODO EditProvider + odświeżanie po dodaniu akcji*/
    const getClientDetails = () => {
        if (clientId)
        {
            apiService.getSingleClient(clientId)
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
    useEffect(() => {
        getClientDetails();
    }, []);

    const openEditClient = () => {
        navigate(`/clients/${clientId}/edit`);
    }
    const deleteAction = (id: string) => {
        return apiService.deleteAction(id)
            .then(
                (response: AxiosResponse<Response>) => {
                    getClientDetails();
                }
            )
            .catch((error) => console.error("An error has occurred:", error));
    }
    return (
        <div>
            <h2 className="mb-4">
                Client: {selectedClient?.firstname} {selectedClient?.surname}
                <Button variant="info" type="button" size="sm" className="" onClick={openEditClient}>Edit details</Button>
            </h2>
            <div className="my-4">
                <p><span className="fw-bold">Is company: </span>
                    {selectedClient?.business && 'YES'}
                    {!selectedClient?.business && 'NO'}
                </p>
                <p><span className="fw-bold">Email: </span> {selectedClient?.email}</p>
                <p><span className="fw-bold">Phone: </span> {selectedClient?.phone}</p>
                <h3>Actions ({selectedClient?.actions?.length}):</h3>
                <ul>
                    {
                        selectedClient?.actions?.map(
                            (action: ActionResponse) => {
                                return (
                                    <li key={action._id}>
                                        {action.type?.name} at {action.date} <br/>
                                        <span className="fw-bold">Subject:</span>{action.subject} <br/>
                                        <span className="fw-bold">Description:</span>{action.description} <br/>
                                        <Button type="button" variant="danger" onClick={() => deleteAction(action._id)}>Delete</Button>
                                    </li>
                                );
                            }
                        )
                    }
                </ul>
                <ActionAdd actionTypes={actionTypes}
                           loggedUser={loggedUser}
                           apiService={apiService}
                           refresh={getClientDetails}
                           selectedClient={selectedClient}/>
            </div>
        </div>
    );
}
