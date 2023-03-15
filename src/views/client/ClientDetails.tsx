import React, {useEffect, useState} from "react";
import {ActionResponse, ActionTypeResponse, ClientResponse} from "../../../helpers/interfaces-responses";
import {Button, Form} from "react-bootstrap";
import {AxiosResponse} from "axios";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ActionRequest} from "../../../helpers/interfaces-requests";
import {useMainContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";

export default function ClientDetails() {
    const navigate = useNavigate();
    const {clientId} = useParams<string>();
    const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(null);
    const {loggedUser, actionTypes, apiService} = useMainContext();
    const [showAddAction, setShowAddAction] = useState<boolean>(false);
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ActionRequest>();

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
    const onSubmit: SubmitHandler<ActionRequest> = (data: ActionRequest) => {
        apiService.createAction(data)
            .then(
                (response: AxiosResponse<Response>) => {
                    setShowAddAction(false);
                    /*props.refresh();*/
                }
            )
            .catch((error) => console.error("An error has occurred:", error));
    }
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
                {!showAddAction && <Button type="button" variant="info" onClick={() => setShowAddAction(true)} className="my-3">Add action</Button>}
                {showAddAction &&
                    <div className="p-4 border-3 border shadow">
                        <h5>New action for {selectedClient?.firstname} {selectedClient?.surname}</h5>
                        <Form name="newActionForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="" controlId="token" hidden>
                                <Form.Label>Token*:</Form.Label>
                                <Controller control={control} name="token" defaultValue={loggedUser.jwt_token}
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
                            <Form.Group className="" controlId="clientId" hidden>
                                <Form.Label>ClientId*:</Form.Label>
                                <Controller control={control} name="clientId" defaultValue={selectedClient?._id}
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control type="text" placeholder="ClientId"
                                                              required
                                                              disabled
                                                              onChange={onChange} value={value} ref={ref} isInvalid={!!errors.clientId}>
                                                </Form.Control>
                                            )} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.clientId?.message}
                                </Form.Control.Feedback>
                                {errors.clientId && <Form.Text className="ValidationMessage">{errors.clientId?.message}</Form.Text>}
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
                            <div className="ButtonsContainer">
                                <Button variant="outline-danger" size="lg" type="reset" onClick={() => setShowAddAction(false)}>Cancel</Button>
                                <Button variant="primary" size="lg" type="submit">Save</Button>
                            </div>
                        </Form>
                    </div>}
            </div>
        </div>
    );
}
