import React, {useEffect, useState} from "react";
import {ActionResponse, ActionTypeResponse, ClientResponse, ObjectContext} from "../../helpers/interfaces-responses";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios/index";
import {Button, Form} from "react-bootstrap";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ActionRequest, ClientRequest} from "../../helpers/interfaces-requests";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function Actions() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [actions, setActions] = useState<ActionResponse[]>();
    const [actionTypes, setActionTypes] = useState<ActionTypeResponse[]>();
    const [clients, setClients] = useState<ClientResponse[]>([]);
    const [selectedAction, setSelectedAction] = useState<ActionResponse | null>(null);
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ActionRequest>();

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

    /*MODAL*/
    let subtitle: HTMLHeadingElement | null;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (subtitle) {
            subtitle.style.color = '#f00';
        }
    }

    function closeModal(data: ActionRequest | null) {
        setIsOpen(false);
        if (data)
        {
            sendRequest(data);
        }
    }

    const onSubmit: SubmitHandler<ActionRequest> = (data: ActionRequest) => {
        closeModal(data);
    }

    const sendRequest = (data: ActionRequest) => {
        apiService.createAction(data)
            .then(
                (response: AxiosResponse<Response>) => {
                    getAllActions();
                }
            )
            .catch((error) => console.error("An error has occurred:", error));
    }

    const deleteAction = (id: string, typeId: string, clientId: string) => {
        apiService.deleteAction(id, typeId, clientId)
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
        getAllClients();
        getAllActionTypes();
    }, []);

    /*TODO dodawanie akcji z poziomu widoku klienta, nie tutaj*/

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
                                    <Button type="button" variant="danger" onClick={() => deleteAction(action._id, action.type?._id, action.client?._id)}>Delete</Button>
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
            {/*<Button type="button" variant="primary" onClick={openModal} className="my-4">Add</Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => closeModal(null)}
                style={customStyles}
                contentLabel="Action"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <Form name="newActionForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="" controlId="token" hidden>
                        <Form.Label>Token*:</Form.Label>
                        <Controller control={control} name="token" defaultValue={objectContext.loggedUser.jwt_token}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Token"
                                                      required
                                                      disabled
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.token}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.token?.message}
                        </Form.Control.Feedback>
                        {errors.token && <Form.Text className="ValidationMessage">{errors.token?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="" controlId="typeId">
                        <Form.Label>Type of action*:</Form.Label>
                        {
                            actionTypes?.map(
                                (actionType: ActionTypeResponse) => {
                                    return (
                                        <Controller control={control} name="typeId" key={actionType._id}
                                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                                        <Form.Check
                                                            type="radio"
                                                            label={actionType.name}
                                                            value={actionType._id}
                                                            name="actionType"
                                                            onChange={onChange} ref={ref} isInvalid={!!errors.typeId}
                                                        />
                                                    )} />
                                    );
                                }
                            )
                        }
                        <Form.Control.Feedback type='invalid'>
                            {errors.typeId?.message}
                        </Form.Control.Feedback>
                        {errors.typeId && <Form.Text className="ValidationMessage">{errors.typeId?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="" controlId="subject">
                        <Form.Label>Subject*:</Form.Label>
                        <Controller control={control} name="subject" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter subject"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.subject}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.subject?.message}
                        </Form.Control.Feedback>
                        {errors.subject && <Form.Text className="ValidationMessage">{errors.subject?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="" controlId="date">
                        <Form.Label>Date*:</Form.Label>
                        <Controller control={control} name="date" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="date" placeholder="Pick date"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.date}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.date?.message}
                        </Form.Control.Feedback>
                        {errors.date && <Form.Text className="ValidationMessage">{errors.date?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="" controlId="description">
                        <Form.Label>Description*:</Form.Label>
                        <Controller control={control} name="description" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter description"
                                                      as="textarea" rows={3}
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.description}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.description?.message}
                        </Form.Control.Feedback>
                        {errors.description && <Form.Text className="ValidationMessage">{errors.description?.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="" controlId="clientId">
                        <Form.Label>Client*:</Form.Label>
                        <Controller control={control} name="clientId" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Select aria-label="Select client" onChange={onChange} value={value} ref={ref} isInvalid={!!errors.clientId}>
                                            <option disabled value="">Open this select menu</option>
                                            {clients?.map(
                                                (client: ClientResponse) => {
                                                    return (
                                                        <option value={client._id} key={client._id}>{client.firstname} {client.surname}</option>
                                                    );
                                                }
                                            )}
                                        </Form.Select>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.clientId?.message}
                        </Form.Control.Feedback>
                        {errors.clientId && <Form.Text className="ValidationMessage">{errors.clientId?.message}</Form.Text>}
                    </Form.Group>
                    <div className="ButtonsContainer">
                        <Button variant="outline-danger" size="lg" type="reset" onClick={() => closeModal(null)}>Cancel</Button>
                        <Button variant="primary" size="lg" type="submit">Save</Button>
                    </div>
                </Form>
            </Modal>*/}
        </div>
    );

}
