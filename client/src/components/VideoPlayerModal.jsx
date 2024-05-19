import React from 'react';
import './VideoPlayerModal.css';

function VideoPlayerModal({ video, onClose }) {
    return (
        <div className="video-player-overlay" onClick={onClose}>
            <div className="video-player-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖️</button>
                <video controls autoPlay className="video-player">
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-details">
                    <h2>{video.name}</h2>
                    <p>{video.description}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayerModal;
