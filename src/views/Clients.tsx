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
Modal.setAppElement('#yourAppElement');

export default function Clients() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const [clients, setClients] = useState<ClientResponse[]>();
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ClientRequest>();

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

    let subtitle: HTMLHeadingElement | null;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const onSubmit: SubmitHandler<ClientRequest> = (data: ClientRequest) => {
        apiService.createClient(data)
            .then((response: AxiosResponse<Response>) => {
                if (response.status === 200) {

                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => console.error("An error has occurred:", error));
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
                            {client.clientPerson.firstname} <Button type="button" variant="danger">Delete</Button>
                        </li>)
                    }
                )}
            </ul>
            <Button type="button" variant="primary" onClick={openModal}>Add</Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <Form name="newClientForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="my-3" controlId="business">
                        <Form.Label>Is company*:</Form.Label>
                        <Controller control={control} name="business" defaultValue={true}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                            <Form.Control type="switch" placeholder="Enter username"
                                          required
                                          onChange={onChange} value={value} ref={ref} isInvalid={!!errors.business}>
                            </Form.Control>
                        )} />
                    </Form.Group>
                </Form>
            </Modal>
        </div>
    );
}
