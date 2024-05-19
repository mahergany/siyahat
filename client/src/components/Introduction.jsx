import React from 'react';
import './Introduction.css';

const Introduction = () => {
    return (
        <div className="introduction-container">
            <h2>Touring Pakistan</h2>
            <div className="reasons">
                <div className="reason" style={{ backgroundColor: '#8A1F5A' }}>
                    <h3>Natural Beauty</h3>
                    <p>Pakistan's breathtaking landscapes, from Himalayan peaks to serene valleys, are easily explored through Siyahat's comprehensive destination guides and tailored travel recommendations. Siyahat helps tourists discover hidden gems and plan their adventures amidst nature's splendor.</p>
                </div>
                <div className="reason" style={{ backgroundColor: '#E8A90A' }}>
                    <h3>Rich Cultural Heritage</h3>
                    <p> Siyahat delves into Pakistan's rich cultural heritage, providing insights into ancient civilizations and UNESCO World Heritage sites. Through immersive content and community engagement, tourists gain a deeper appreciation for the country's cultural tapestry and connect with locals for authentic experiences.</p>
                </div>
                <div className="reason" style={{ backgroundColor: '#0BB2A2' }}>
                    <h3>Warm Hospitality</h3>
                    <p>Siyahat fosters connections between travelers and locals, promoting cultural exchange and facilitating meaningful interactions. Through its community forums and user reviews, tourists receive insider tips and recommendations, enhancing their experience of Pakistani hospitality.</p>
                </div>
                <div className="reason" style={{ backgroundColor: '#D6356A' }}>
                    <h3>Adventure</h3>
                    <p>Siyahat caters to adventure enthusiasts, offering a platform to discover and book a wide range of thrilling activities, from trekking and mountaineering to white-water rafting and desert safaris. With Siyahat's guidance, tourists can embark on adrenaline-pumping adventures with confidence.</p>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
