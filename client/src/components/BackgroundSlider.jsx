import React, {useEffect, useState} from 'react';
import './BackgroundSlider.css';
import imageSlide from '../data';
import { useNavigate } from "react-router-dom";

function BackgroundSlider() {

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


    return (
        <div className="container-style">

        
            
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