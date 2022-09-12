import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.scss';

const ModalWrapper = (WrapperComponent) => {
    const Wrapper = ({ ...props }) => {
        return (
            <Modal
                onHide={props.onHide}
                show={props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-class"
                animation={false}
            >
                <WrapperComponent {...props} />
            </Modal>
        );
    }

    return Wrapper;
};


export default ModalWrapper;