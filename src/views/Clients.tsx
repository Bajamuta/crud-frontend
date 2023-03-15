import React, {useEffect, useState} from "react";
import {ClientResponse} from "../../helpers/interfaces-responses";
import {AxiosResponse} from "axios";
import {Button} from "react-bootstrap";
import {ClientRequest} from "../../helpers/interfaces-requests";
import {useMainContext} from "../App";
import {useNavigate} from "react-router-dom";

export default function Clients() {
    const navigate = useNavigate();
    const {apiService} = useMainContext();
    const [clients, setClients] = useState<ClientResponse[]>([]);

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
        navigate(`/clients/${id}`);
    }
    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div className="">
            <h3 className="mb-4">Clients</h3>
            <table className="table">
                <thead className="table-light">
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
                    (client: ClientResponse, index: number) => {
                        return (
                        <tr key={client._id}>
                            <th scope="row">{index + 1}</th>
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
                <tfoot className="table-light">
                <tr>
                    <td colSpan={6}>Total: {clients?.length} client(s)</td>
                </tr>
                </tfoot>
            </table>
            <ul>

            </ul>
{/*            <AddClient refresh={refreshClientsList} createClient={createClient}/>*/}
        </div>
    );
}
