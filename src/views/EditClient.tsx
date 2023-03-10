import React, {useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import Modal from "react-modal";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ClientRequest} from "../../helpers/interfaces-requests";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios";
import {ClientResponse} from "../../helpers/interfaces-responses";

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

interface EditClientProps {
    selectedClient: ClientResponse | null,
    editClient: (data: ClientRequest) => void,
    modalIsOpen: boolean,
    closeModal: () => void,
}

export default function EditClient(props: EditClientProps) {

    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<ClientRequest>();
    const apiService: ApiService = new ApiService();
    let subtitle: HTMLHeadingElement | null;
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (subtitle) {
            subtitle.style.color = '#f00';
        }
    }
    const onSubmit: SubmitHandler<ClientRequest> = (data: ClientRequest) => {
        props.editClient(data);
    }

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => props.closeModal()}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <Form name="newClientForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="" controlId="business">
                        <Form.Label>Is company*:</Form.Label>
                        <Controller control={control} name="business" defaultValue={props.selectedClient?.business}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Check
                                            type="switch"
                                            label="Is company"
                                            checked={value}
                                            name="business"
                                            onChange={onChange} ref={ref} isInvalid={!!errors.business}
                                        />
                                    )} />
                    </Form.Group>
                    <Form.Group className="" controlId="firstname">
                        <Form.Label>First name*:</Form.Label>
                        <Controller control={control} name="firstname" defaultValue={props.selectedClient?.firstname}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter first name"
                                                      required
                                                      defaultValue=""
                                                      onChange={onChange} value={value} ref={ref} isInvalid={!!errors.firstname}>
                                        </Form.Control>
                                    )} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.firstname?.message}
                        </Form.Control.Feedback>
                        {errors.firstname && <Form.Text className="ValidationMessage">{errors.firstname?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="" controlId="surname">
                        <Form.Label>Surname*:</Form.Label>
                        <Controller control={control} name="surname" defaultValue={props.selectedClient?.surname}
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
                    <Form.Group className="" controlId="email">
                        <Form.Label>Email*:</Form.Label>
                        <Controller control={control} name="email" defaultValue={props.selectedClient?.email}
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
                    <Form.Group className="" controlId="phone">
                        <Form.Label>Phone*:</Form.Label>
                        <Controller control={control} name="phone" defaultValue={props.selectedClient?.phone}
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
                    {watch().business && <Form.Group className="" controlId="nip">
                        <Form.Label>NIP*:</Form.Label>
                        <Controller control={control} name="nip" defaultValue={props.selectedClient?.nip}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter NIP"
                                                      required
                                                      onChange={onChange} value={value} ref={ref}
                                                      isInvalid={!!errors.nip}>
                                        </Form.Control>
                                    )}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.nip?.message}
                        </Form.Control.Feedback>
                        {errors.nip && <Form.Text className="ValidationMessage">{errors.nip?.message}</Form.Text>}
                    </Form.Group>}
                    {watch().business && <Form.Group className="" controlId="companyName">
                        <Form.Label>Company Name*:</Form.Label>
                        <Controller control={control} name="companyName" defaultValue={props.selectedClient?.companyName}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Form.Control type="text" placeholder="Enter company subject"
                                                      required
                                                      onChange={onChange} value={value} ref={ref}
                                                      isInvalid={!!errors.companyName}>
                                        </Form.Control>
                                    )}/>
                        <Form.Control.Feedback type='invalid'>
                            {errors.companyName?.message}
                        </Form.Control.Feedback>
                        {errors.companyName &&
                            <Form.Text className="ValidationMessage">{errors.companyName?.message}</Form.Text>}
                    </Form.Group>}
                    <Form.Group className="" controlId="city">
                        <Form.Label>City*:</Form.Label>
                        <Controller control={control} name="city" defaultValue={props.selectedClient?.city}
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
                    <Form.Group className="" controlId="country">
                        <Form.Label>Country*:</Form.Label>
                        <Controller control={control} name="country" defaultValue={props.selectedClient?.country}
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
                    <Form.Group className="" controlId="postal">
                        <Form.Label>Postal*:</Form.Label>
                        <Controller control={control} name="postal" defaultValue={props.selectedClient?.postal}
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
                    <Form.Group className="" controlId="streetWithNumbers">
                        <Form.Label>Street with numbers*:</Form.Label>
                        <Controller control={control} name="streetWithNumbers" defaultValue={props.selectedClient?.streetWithNumbers}
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
                        <Button variant="outline-danger" size="lg" type="reset" onClick={() => props.closeModal()}>Cancel</Button>
                        <Button variant="primary" size="lg" type="submit">Save</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
