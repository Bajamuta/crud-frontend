import React, {useEffect, useState} from "react";
import {ActionResponse, ClientResponse, ObjectContext} from "../../helpers/interfaces-responses";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios/index";
import {Button} from "react-bootstrap";

export default function Actions() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [actions, setActions] = useState<ActionResponse[]>();

    const getAllActions = () => {
        apiService.getAllActions().then(
            (response: AxiosResponse<ActionResponse[]>) => {
                if (response.status === 200)
                {
                    setActions(response.data);
                }
            }
        )
            .catch((e) => console.error(e));
    }

    useEffect(() => {
        getAllActions();
    }, []);

    /*TODO akcje*/

    return (
        <div className="Container">
            <h3>Actions</h3>
            <table>
                <thead>
                    <th scope="col">Lp.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </thead>
                <tbody>
                {
                    actions?.map(
                    (action: ActionResponse) =>
                        {
                        return (
                            <tr key={action._id}>
                                <th scope="row">{action._id}</th>
                                <td>{action.name}</td>
                                <td>{action.date}</td>
                                <td>{action.type.name}</td>
                                <td>{action.description}</td>
                                <td>
                                    <Button type="button" variant="warning">Edit</Button>
                                    <Button type="button" variant="danger">Delete</Button>
                                </td>
                            </tr>
                        )}
                    )
                }
                </tbody>
                <tfoot></tfoot>
            </table>
            <Button type="button" variant="primary">Add</Button>
        </div>
    );

}
