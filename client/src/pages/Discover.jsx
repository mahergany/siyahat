import React, { useEffect } from 'react';
import './Discover.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';


function Discover() {

  const [rotation, setRotation] = useState(0);
  const infoCount = 5;
  const segmentAngle = 360 / infoCount;
  const currentSegment = Math.floor((rotation % 360) / segmentAngle);
  const [segment, setSegment] = useState(0);

  const titles = [
    'Top Trending',
    'Punjab',
    'Sindh',
    'Balochistan',
    'KPK'
  ];
 
 
 
    const handleScroll = (e) => {
      const newRotation = rotation + e.deltaY * 0.5;
      setRotation(newRotation);
      const normalizedRotation = (newRotation % 360 + 360) % 360;
      const newSegment = Math.floor(normalizedRotation / segmentAngle);
      setSegment(newSegment);
    };

   

  return (
    <>
      <Navbar />
      <div className="container-discover" 
        onWheel={(e) => handleScroll(e)} >
        <img className="wheel" src="/assets/muntaha.png" alt=""
      style={{ transform: `rotate(${rotation}deg)` }}
        />
       
            <div className="circle">
              <div className="text"   >
              {titles[segment].split('').map((char, i) => (
              <span key={i} style={{ 
              transform: `rotate(${rotation}deg)`
             }}>{titles[segment]}</span>
            ))}
              </div>
            </div>

        <img className="sideleft" src="/assets/Picture7.png" alt="" />
        <img className="sideright" src="/assets/Picture7.png" alt="" />
        <img className="left" src="/assets/Picture8.png" alt="" />
        <img className="right" src="/assets/Picture8.png" alt="" />
        <div className="info">
          {segment === 0 && <div className="toprating"> 1</div>}
          {segment === 1 && <div className="punjab">punjab 2</div>}
          {segment === 2 && <div className="sindh">sindh 3</div>}
          {segment === 3 && <div className="balochistan">balochistan 4</div>}
          {segment === 4 && <div className="kpk">kpk 5</div>}
        </div>
      </div>
    </>
  );
}

export default Discover;
