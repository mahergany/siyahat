import React from 'react';
import './ProvinceCard.css';

const ProvinceCard = ({ name, description, image, onClick }) => {
    return (
        <div className="province-card" onClick={onClick}>
            <img src={image} alt={name} className="province-image" />
            <div className="province-content">
                <h3>{name}</h3>
            </div>
        </div>
    );
};

export default ProvinceCard;
