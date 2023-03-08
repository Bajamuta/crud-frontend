import React, {useEffect} from "react";
import {ClientResponse} from "../../helpers/interfaces-responses";
import Modal from "react-modal";
import {Button} from "react-bootstrap";

interface ClientDetailsProps {
    selectedClient: ClientResponse | null,
    modalIsOpen: boolean,
    closeModal: () => void
}

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

export default function ClientDetails(props: ClientDetailsProps) {
    let subtitle: HTMLHeadingElement | null;
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (subtitle) {
            subtitle.style.color = '#f00';
        }
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
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Client: {props.selectedClient?.firstname} {props.selectedClient?.surname}
                </h2>
                <div className="">
                    <p><span className="fw-bold">Is company:</span> {props.selectedClient?.business}</p>
                    <p><span className="fw-bold">Email:</span> {props.selectedClient?.email}</p>
                    <p><span className="fw-bold">Phone:</span> {props.selectedClient?.phone}</p>
                </div>
                <Button variant="primary" type="button" size="lg" onClick={props.closeModal}>Close</Button>
            </Modal>
        </div>
    );
}
