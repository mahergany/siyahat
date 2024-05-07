import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
// import getAttractions from 'client/src/components/MapComponents/attractions.js'; 
import useStyles from './styles';
import mapStyles from './mapStyles.js'
import axios from 'axios';
import attractionsData from '../attractions.json' 

function Map({setCoordinates, setBounds, coordinates, places, setChildClicked}){
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');


    const [attractions, setAttractions] = useState([]);


    
   return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates || defaultCoordinates}
                center={coordinates || defaultCoordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e)=>{
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => {setChildClicked(child)}}
            >
                {places?.map((place, i)=>(
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" >
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {/* {attractions.length ? attractions.map((attraction, index)=>(
                    <div
                        key={index}
                        className={classes.markerContainer}
                        lat={Number(attraction.latitude)}
                        lng={Number(attraction.longitude)}
                    >

                    </div>
                ))
                    : <></>} */}
                {attractionsData.map((attraction, index) => (
                    <div 
                        key={index}
                        className={classes.markerContainer}
                        lat={Number(attraction.latitude)}
                        lng={Number(attraction.longitude)}
                    >
                        {!isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" >
                                        {attraction._key}
                                    </Typography>
                                    {/* <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly /> */}
                                </Paper>
                            )
}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map