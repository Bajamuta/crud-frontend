import React, {useEffect, useState} from "react";
import {ActionResponse, ActionTypeResponse, ClientResponse} from "../../helpers/interfaces-responses";
import Modal from "react-modal";
import {Button, Form} from "react-bootstrap";
import {AxiosResponse} from "axios";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ActionRequest} from "../../helpers/interfaces-requests";

interface ClientDetailsProps {
    selectedClient: ClientResponse | null,
    modalIsOpen: boolean,
    closeModal: () => void,
    jwt_token: string,
    actionTypes: ActionTypeResponse[] | undefined,
    createAction: (data: ActionRequest) => Promise<any>,
    refresh: () => void,
    deleteAction: (id: string) => Promise<any>,
    openEditClient: () => void
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '6px 6px 20px lightgray'
    },
};

export default function ClientDetails(props: ClientDetailsProps) {
    let subtitle: HTMLHeadingElement | null;
    const [showAddAction, setShowAddAction] = useState<boolean>(false);
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ActionRequest>();
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (subtitle) {
            subtitle.style.color = '#f00';
        }
    }
    const onSubmit: SubmitHandler<ActionRequest> = (data: ActionRequest) => {
        props.createAction(data)
            .then(
                (response: AxiosResponse<Response>) => {
                    setShowAddAction(false);
                    props.refresh();
                }
            )
            .catch((error) => console.error("An error has occurred:", error));
    }
    const deleteAction = (id: string) => {
        return props.deleteAction(id)
            .then(
                (response: AxiosResponse<Response>) => {
                    props.refresh();
                }
            )
            .catch((error) => console.error("An error has occurred:", error));
    }
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);
    /*TODO szczegóły klienta jako komponent a nie modal*/
    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => props.closeModal()}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Client: {props.selectedClient?.firstname} {props.selectedClient?.surname}
                </h2>
                <div className="my-4">
                    <Button variant="info" type="button" size="lg" className="w-50" onClick={props.openEditClient}>Edit details</Button>
                    <p><span className="fw-bold">Is company: </span>
                        {props.selectedClient?.business && 'YES'}
                        {!props.selectedClient?.business && 'NO'}
                    </p>
                    <p><span className="fw-bold">Email: </span> {props.selectedClient?.email}</p>
                    <p><span className="fw-bold">Phone: </span> {props.selectedClient?.phone}</p>
                    <h3>Actions ({props.selectedClient?.actions?.length}):</h3>
                    <ul>
                        {
                            props.selectedClient?.actions?.map(
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
                            <h5>New action for {props.selectedClient?.firstname} {props.selectedClient?.surname}</h5>
                        <Form name="newActionForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="" controlId="token" hidden>
                                <Form.Label>Token*:</Form.Label>
                                <Controller control={control} name="token" defaultValue={props.jwt_token}
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
                                <Controller control={control} name="clientId" defaultValue={props.selectedClient?._id}
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
                                    props.actionTypes?.map(
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
                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="button" size="lg" className="w-50" onClick={props.closeModal}>Close</Button>
                </div>
            </Modal>
        </div>
    );
}
