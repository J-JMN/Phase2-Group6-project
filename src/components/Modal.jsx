import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function ModalComponent({show,handleClose,handleAction,header,children}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='py-1 my-0'>
            <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer  className='py-1 my-0'>
            <Button variant="secondary" onClick={handleClose} size='sm' className=''> Close </Button>
            <Button variant="primary" onClick={handleAction} size='sm' className='custom-bg-primary custom-text-color-secondary'> Save Changes </Button>
        </Modal.Footer>
    </Modal>
  )
};
export default ModalComponent;