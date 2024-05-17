import React, { useEffect, useState, useRef } from 'react';
import './BackgroundSlider.css';
import imageSlide from '../data';

import { useNavigate } from "react-router-dom";


function BackgroundSlider() {
    const [index, setIndex] = useState(0);
    const videoRefs = useRef([]);


    useEffect(() => {
        const lastIndex = imageSlide.length - 1;
        const timer = setInterval(() => {
            setIndex(prevIndex => (prevIndex === lastIndex ? 0 : prevIndex + 1));
        }, 3000); 
        return () => clearInterval(timer);
    }, []);

    const navigate = useNavigate();
   


    
    const [index, setIndex] = useState(0); 
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % imageSlide.length);
          navigate(0);
        }, 5000); // Change video every 5 seconds (adjust as needed)
    
        return () => clearInterval(interval);
      }, [imageSlide.length]);



    const bgVideoStyle = {
        position: 'fixed',
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        // zIndex: -100,
    };


    useEffect(() => {
        videoRefs.current.forEach((video, idx) => {
            if (idx === index) {
                video.style.transition = 'opacity 1s ease-in-out';
                video.style.opacity = 1;
                setTimeout(() => {
                    video.play();
                }, 500); 
            } else {
                video.style.transition = 'opacity 1s ease-in-out';
                video.style.opacity = 0;
                setTimeout(() => {
                    video.pause();
                    video.currentTime = 0;
                }, 1000); 
            }
        });
    }, [index]);

    return (
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


        
            
            <video style={bgVideoStyle} autoPlay muted >
                <source src={imageSlide[index].url} type="video/mp4" />
            
                Your browser does not support the video tag.
            </video>
           <div className="description">
                {imageSlide[index].Description}
                </div>

      
           
        </div>
    );
}

export default BackgroundSlider;
