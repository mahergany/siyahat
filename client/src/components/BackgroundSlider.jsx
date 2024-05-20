import React, { useEffect, useState, useRef } from 'react';
import { PhotoLibraryOutlined } from '@mui/icons-material'; 
import './BackgroundSlider.css';
import imageSlide from '../data';

import VideoGalleryModal from './VideoGalleryModal';

function BackgroundSlider() {
    const [index, setIndex] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        const lastIndex = imageSlide.length - 1;
        const timer = setInterval(() => {
            setIndex(prevIndex => (prevIndex === lastIndex ? 0 : prevIndex + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video, idx) => {
            if (idx === index) {
                video.style.opacity = 1;
                setTimeout(() => {
                    video.play();
                }, 500);
            } else {
                video.style.opacity = 0;
                setTimeout(() => {
                    video.pause();
                    video.currentTime = 0;
                }, 1000);
            }
        });
    }, [index]);

    return (
        <>
            <div className="container-style">
                {imageSlide.map((slide, idx) => (
                    <video
                        key={idx}
                        ref={el => videoRefs.current[idx] = el}
                        className={`bg-video ${idx === index ? 'active' : ''}`}
                        muted
                        preload="auto"
                    >
                        <source src={slide.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
                <button className="gallery-icon" onClick={() => setShowGallery(true)}>
                    <PhotoLibraryOutlined style={{ color: 'white' }} /> 
                </button>
            </div>
            {showGallery && <VideoGalleryModal onClose={() => setShowGallery(false)} />}
        </>
    );
}

export default BackgroundSlider;
