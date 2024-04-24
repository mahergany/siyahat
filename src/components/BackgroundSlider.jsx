import React, {useEffect, useState} from 'react';
import './BackgroundSlider.css';
import imageSlide from '../data';


function BackgroundSlider() {

      
    const parallax_el = document.querySelectorAll('.parallax');

    let xValue =0 , yValue = 0;

    window.addEventListener('mousemove', function(event){
        xValue = event.clientX - window.innerWidth/2;
        yValue = event.clientY - window.innerHeight/2;

    

        parallax_el.forEach( el => {   
            let speedx = el.dataset.speedx;
            let speedy = el.dataset.speedy;
            let zValue = 700;
            el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) perspective(2300px) translateZ(${zValue}px)`;


            });
        
    });


    
    // const [index, setIndex] = useState(0); 
    // useEffect(() => {
    //     const lastIndex = imageSlide.length - 1;
    //     const timer = setInterval (() => {
    //         setIndex(prevIndex => {
    //             if(prevIndex === lastIndex){
    //                 return 0;
    //             } else {
    //                 return prevIndex + 1;
    //             }
    //         });
    //     }, 4000);
    //     return () => clearInterval(timer);
    // }, [index]);
    
    




    // const bgImageStyle = {
    //     backgroundImage: `url(${imageSlide[index].url})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     height: '100%',
       
    
    // }
    return (
        <div className="container-style">

            <img class="parallax bg" data-speedx="0.3" data-speedy="0.5" src="src/Images/2.jpg" alt="image is not loading" />
            <img class="parallax m"  data-speedx=".135" data-speedy=".120"  src= "src/Images/1.png" alt="image is not loading" />
       {/* 

            <div style={bgImageStyle}></div> */}
            {/* <div className="description">
                <h1>{imageSlide[index].title}</h1>
                <p>{imageSlide[index].body}</p>
            </div> */}
           
        </div>
    );
}

export default BackgroundSlider;