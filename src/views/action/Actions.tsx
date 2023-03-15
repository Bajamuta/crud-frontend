import React, {useEffect, useState} from "react";
import {ActionResponse} from "../../../helpers/interfaces-responses";
import {AxiosResponse} from "axios/index";
import {Button} from "react-bootstrap";
import Modal from "react-modal";
import {useMainContext} from "../../App";

export default function Actions() {
    const {loggedUser, apiService} = useMainContext();
    const [actions, setActions] = useState<ActionResponse[]>();

    const getAllActions = () => {
        apiService.getActionsUser(loggedUser.id).then(
            (response: AxiosResponse<ActionResponse[]>) => {
                if (response.status === 200)
                {
                    setActions(response.data);
                }
            }
        )
            .catch((e) => console.error(e));
    }

    const deleteAction = (id: string) => {
        apiService.deleteAction(id)
            .then((response: AxiosResponse<Response>) => {
                if (response.status === 200) {
                    getAllActions();
                }
                else
                {
                    console.log(response);
                }
            })
            .catch((error) => console.error("An error has occurred:", error));
    }

    useEffect(() => {
        Modal.setAppElement('body');
        getAllActions();
    }, []);
    return (
        <div className="TableContainer">
            <h3>Actions</h3>
            <table>
                <thead>
                <tr>
                    <th scope="col">Lp.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>

                </thead>
                <tbody>
                {
                    actions?.map(
                    (action: ActionResponse) =>
                        {
                        return (
                            <tr key={action._id}>
                                <th scope="row">{action._id}</th>
                                <td>{action.subject}</td>
                                <td>{action.date}</td>
                                <td>{action.type?.name}</td>
                                <td>{action.description}</td>
                                <td className="TableButtons">
                                    <Button type="button" variant="warning">Edit</Button>
                                    <Button type="button" variant="danger" onClick={() => deleteAction(action._id)}>Delete</Button>
                                </td>
                            </tr>
                        )}
                    )
                }
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6}>Total: {actions?.length} action(s)</td>
                </tr>
                </tfoot>
            </table>
        </div>
    );

}
