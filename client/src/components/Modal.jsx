import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, province }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="close-button1" onClick={onClose}>&times;</button>
                <h2>{province.name}</h2>
                <p>{province.description}</p>
            </div>
        </div>
    );
};

export default Modal;
