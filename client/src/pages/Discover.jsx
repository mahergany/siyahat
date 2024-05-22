import React, { useEffect } from 'react';
import './Discover.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import {Chip} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import {CircularProgress} from '@material-ui/core';

function Discover() {

  const navigate = useNavigate();

  const [rotation, setRotation] = useState(0);
  const infoCount = 5;
  const segmentAngle = 360 / infoCount;
  const currentSegment = Math.floor((rotation % 360) / segmentAngle);
  const [segment, setSegment] = useState(0);
  const [showAttractions, setShowAttractions] = useState(true);
  const [topTrending, setTopTrending] = useState([]);
  const [punjab, setPunjab] = useState([]);
  const [sindh, setSindh] = useState([]);
  const [kpk, setKpk] = useState([]);
  const [balochistan, setBalochistan] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // const [places, setPlaces]

  // const titles = [
  //   'Top Trending',
  //   'Punjab',
  //   'Sindh',
  //   'Balochistan',
  //   'KPK'
  // ];
  const titles = {
    0: 'Top Trending',
    1: 'Punjab',
    2: 'Sindh',
    3: 'Balochistan',
    4: 'Khyber Pakhtunkhwa'
  };

  //getting all places corresponding to each province in the start
  //to avoid re renders
  const getTop5PlacesForProvince = async (provinceName) => {
    try{
      const response = await fetch(`http://localhost:3001/places/top5province/${provinceName}`,
      {
        method: "GET",
        // headers: {Authorization: `Bearer ${token}`}
      })
      const data = await response.json()
      console.log(provinceName, data);
      if(provinceName == "Sindh"){
        setSindh(data);
      }
      else if(provinceName == "Punjab"){
        setPunjab(data);
      }
      else if(provinceName == "Khyber Pakhtunkhwa"){
        setKpk(data);
      }
      else if(provinceName == "Balochistan"){
        setBalochistan(data);
      }
    }
    catch(error){
      console.error(error)
    }
  }

  const getTop5Places = async () => {
    try{
      const response = await fetch(`http://localhost:3001/places/alltop5/`,
      {
        method: "GET",
      })
      // console.log("line 59")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
      const data = await response.json();
      console.log(data);
      setTopTrending(data);
    }
    catch(error){console.log("client: error")
      console.error(error)
    }
  }

  useEffect(()=>{
    Object.keys(titles).forEach((key) => {
      const title = titles[key];
      // console.log(title);
      if(key == 0)
        getTop5Places();
      else
        getTop5PlacesForProvince(title);
    });
    setIsLoading(false);
  }, [])
 
 
 
    const handleScroll = (e) => {
      const newRotation = rotation + e.deltaY * 0.5;
      setRotation(newRotation);
      const normalizedRotation = (newRotation % 360 + 360) % 360;
      const newSegment = Math.floor(normalizedRotation / segmentAngle);
      setSegment(newSegment);
    };

    const handleChipClick = (isAttractionsChip) => {
      setShowAttractions(isAttractionsChip);
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
          {isLoading ? (
              <div className={"loading"}>
                  <CircularProgress size="5rem" />
              </div> 
          ) : (
            <>

<FlexBetween>
  <div className="top5">
    {segment == 0 ? (
      <h2 className='top5-title'>Top Trending Places</h2>
    ) : (
      <h2 className='top5-title'>Top 5 Places in {titles[segment]}</h2>
    )}
  </div>
</FlexBetween>

  {segment === 0 && 
  <div className="toprating">
    {topTrending.length && topTrending.map((place, index) => (
      <FlexBetween key={place._id}>
        <h3 className="placeText">{(index + 1) + '.'}</h3>
        <span className="tab-space"></span>
        <h3  className="placeText link"
          onClick={(e)=>{
          e.stopPropagation();
          navigate(`/place/${place._id}`);
          navigate(0);
        }}>{place.name}</h3>
      </FlexBetween>
    ))}
  </div>}
  {segment === 1 && 
    <div className="punjab">
    {punjab.length && punjab.map((place, index) => (
      <FlexBetween key={place._id}>
        <h3 className="placeText">{(index + 1) + '.'}</h3>
        <span className="tab-space"></span>
        <h3 className="placeText link"
        onClick={(e)=>{
          e.stopPropagation();
          navigate(`/place/${place._id}`);
          navigate(0);
        }}>{place.name}</h3>
      </FlexBetween>
    ))}
  </div>}
  {segment === 2 && 
    <div className="sindh">
    {sindh.length && sindh.map((place, index) => (
      <FlexBetween key={place._id}>
        <h3 className="placeText">{(index + 1) + '.'}</h3>
        <span className="tab-space"></span>
        <h3  className="placeText link"
         onClick={(e)=>{
          e.stopPropagation();
          navigate(`/place/${place._id}`);
          navigate(0);
        }}>{place.name}</h3>
      </FlexBetween>
    ))}
  </div>          
  }
  {segment === 3 && 
    <div className="balochistan">
      {balochistan.length && balochistan.map((place, index) => (
          <FlexBetween key={place._id}>
            <h3 className="placeText">{(index + 1) + '.'}</h3>
            <span className="tab-space"></span>
            <h3  className="placeText link"
              onClick={(e)=>{
              e.stopPropagation();
              navigate(`/place/${place._id}`);
              navigate(0);
            }}>{place.name}</h3>
          </FlexBetween>
        ))}
    </div>
  }
  {segment === 4 && 
    <div className="kpk">
      {kpk.length &&
        kpk.map((place, index) => (
            <FlexBetween key={place._id}>
              <h3 className="placeText">{(index + 1) + '.'}</h3>
              <span className="tab-space"></span>
              <h3  className="placeText link"
              onClick={(e)=>{
                e.stopPropagation();
                navigate(`/place/${place._id}`);
                navigate(0);
              }}>{place.name}</h3>
            </FlexBetween>
        ))
      }
    </div>
  }
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Discover;
