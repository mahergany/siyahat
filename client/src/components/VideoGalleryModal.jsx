import React, { useState } from 'react';
import videoData from '../videoData';
import './VideoGalleryModal.css';
import VideoPlayerModal from './VideoPlayerModal';

function VideoGalleryModal({ onClose }) {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖️</button>
                <div className="video-gallery">
                    {videoData.map((video, idx) => (
                        <div 
                            key={idx} 
                            className="video-item" 
                            onClick={() => setSelectedVideo(video)}
                        >
                            <video
                                preload="auto"
                                className="gallery-video"
                                onMouseEnter={e => e.currentTarget.play()}
                                onMouseLeave={e => e.currentTarget.pause()}
                            >
                                <source src={video.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="video-title">{video.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedVideo && (
                <VideoPlayerModal 
                    video={selectedVideo} 
                    onClose={() => setSelectedVideo(null)} 
                />
            )}
        </div>
    );
}

export default VideoGalleryModal;
