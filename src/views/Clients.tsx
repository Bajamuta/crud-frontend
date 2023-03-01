import React, {useEffect, useState} from "react";
import {ClientResponse, ObjectContext} from "../../helpers/interfaces-responses";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-modal';
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {ClientRequest} from "../../helpers/interfaces-requests";

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#appElement'); TODO modal

export default function Clients() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [clients, setClients] = useState<ClientResponse[]>([]);
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ClientRequest>();

    const getAllClients = () => {
        apiService.getAllClients().then(
            (response: AxiosResponse<ClientResponse[]>) => {
                if (response.status === 200)
                {
                    console.log('here', response, response.data);
                    setClients(response.data);
                }
            }
        )
            .catch((e) => console.error(e));
    }

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

    function closeModal(data: ClientRequest | null) {
        setIsOpen(false);
        if (data)
        {
            sendRequest(data);
        }
    }

    const sendRequest = (data: ClientRequest) => {
        apiService.createClient({...data, business: false})
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

    const onSubmit: SubmitHandler<ClientRequest> = (data: ClientRequest) => {
        closeModal(data);
    }

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div className="Container">
            <h3>Clients</h3>
            <ul>
                {clients?.map(
                    (client: ClientResponse) => {
                        return (<li key={client._id}>
                            <span className="me-2">{client.firstname} {client.surname} {client.email}</span>
                            <Button type="button" variant="danger">Delete</Button>
                        </li>)
                    }
                )}
            </ul>
            <Button type="button" variant="primary" onClick={openModal}>Add</Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => closeModal(null)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <Form name="newClientForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                    {/*<Form.Group className="my-3" controlId="business">
                        <Form.Label>Is company*:</Form.Label>
                        <Controller control={control} name="business" defaultValue={true}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                            <Form.Control type="switch" placeholder="Enter username"
                                          required
                                          onChange={onChange} value={value} ref={ref} isInvalid={!!errors.business}>
                            </Form.Control>
                        )} />
                    </Form.Group>*/}
                    <Form.Group className="my-3" controlId="firstname">
                        <Form.Label>First name*:</Form.Label>
                        <Controller control={control} name="firstname" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter first name"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.firstname}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.firstname?.message}
                        </Form.Control.Feedback>
                        {errors.firstname && <Form.Text className="ValidationMessage">{errors.firstname?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="surname">
                        <Form.Label>Surname*:</Form.Label>
                        <Controller control={control} name="surname" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter surname"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.surname}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.surname?.message}
                        </Form.Control.Feedback>
                        {errors.surname && <Form.Text className="ValidationMessage">{errors.surname?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="email">
                        <Form.Label>Email*:</Form.Label>
                        <Controller control={control} name="email" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="email" placeholder="Enter email"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.email}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.email?.message}
                        </Form.Control.Feedback>
                        {errors.email && <Form.Text className="ValidationMessage">{errors.email?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="phone">
                        <Form.Label>Phone*:</Form.Label>
                        <Controller control={control} name="phone" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter phone"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.phone}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.phone?.message}
                        </Form.Control.Feedback>
                        {errors.phone && <Form.Text className="ValidationMessage">{errors.phone?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="nip">
                        <Form.Label>NIP:</Form.Label>
                        <Controller control={control} name="nip" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter NIP"
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.nip}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.nip?.message}
                        </Form.Control.Feedback>
                        {errors.nip && <Form.Text className="ValidationMessage">{errors.nip?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="companyName">
                        <Form.Label>Company Name:</Form.Label>
                        <Controller control={control} name="companyName" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter company name"
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.companyName}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.companyName?.message}
                        </Form.Control.Feedback>
                        {errors.companyName && <Form.Text className="ValidationMessage">{errors.companyName?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="city">
                        <Form.Label>City*:</Form.Label>
                        <Controller control={control} name="city" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter city"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.city}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.city?.message}
                        </Form.Control.Feedback>
                        {errors.city && <Form.Text className="ValidationMessage">{errors.city?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="country">
                        <Form.Label>Country*:</Form.Label>
                        <Controller control={control} name="country" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter country"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.country}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.country?.message}
                        </Form.Control.Feedback>
                        {errors.country && <Form.Text className="ValidationMessage">{errors.country?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="postal">
                        <Form.Label>Postal*:</Form.Label>
                        <Controller control={control} name="postal" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter postal"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.postal}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.postal?.message}
                        </Form.Control.Feedback>
                        {errors.postal && <Form.Text className="ValidationMessage">{errors.postal?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="my-3" controlId="streetWithNumbers">
                        <Form.Label>Street with numbers*:</Form.Label>
                        <Controller control={control} name="streetWithNumbers" defaultValue=""
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter street with numbers"
                                                      required
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.streetWithNumbers}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.streetWithNumbers?.message}
                        </Form.Control.Feedback>
                        {errors.streetWithNumbers && <Form.Text className="ValidationMessage">{errors.streetWithNumbers?.message}</Form.Text>}
                    </Form.Group>
                    <div className="ButtonsContainer">
                        <Button variant="outline-danger" size="lg" type="reset" onClick={() => closeModal(null)}>Cancel</Button>
                        <Button variant="primary" size="lg" type="submit">Save</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
