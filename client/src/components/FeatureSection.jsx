import React from 'react';
import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';
import './FeatureSection.css';

const FeatureSection = ({ title, text, imageUrl, imageLeft, link, linkText }) => {
    return (
        <div className={`feature-section ${imageLeft ? 'image-left' : ''} ${!imageUrl ? 'no-image' : ''}`}>
            <Fade bottom>
                <div className="feature-content">
                    <div className="feature-text">
                        <h2>{title}</h2>
                        <p>{text}</p>
                        {link && (
                            <Link to={link} className="feature-link">
                                {linkText}
                            </Link>
                        )}
                    </div>
                    {imageUrl && (
                        <div className="feature-image">
                            <img src={imageUrl} alt={title} />
                        </div>
                    )}
                </div>
            </Fade>
        </div>
    );
};

export default FeatureSection;
