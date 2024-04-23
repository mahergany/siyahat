import Navbar  from "../components/Navbar";

import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid} from '@material-ui/core';

import { getPlacesData } from "../api/index.js";
import Header from '../components/MapComponents/Header/Header.jsx';
import List from '../components/MapComponents/List/List.jsx';
import Map from '../components/MapComponents/Map/Map.jsx'


function MapPage(){
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const  [childClicked, setChildClicked]= useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [filter, setFilter] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude});
        });
    }, []);

    useEffect(() => {

        // const filtered = places.filter((place) => {console.log(Number(place.rating), Number(rating));Number(place.rating) > Number(rating);});
        const filtered = places.filter((place) => Number(place.rating) > Number(rating));
        setFilter(true);
        setFilteredPlaces(filtered);
    }, [rating]);


    useEffect(() => {
        if (bounds) {
            setIsLoading(true);

            //temporary limit for the API calls
            const limit = 1;

            getPlacesData(type, bounds.sw, bounds.ne, limit)
            .then((data) => {
                setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                // setFilteredPlaces([]);
                setFilter(false);
                setRating('');
                setIsLoading(false);
        });
    }
    }, [bounds, type]);

    const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };


    return(
        <>
        <Navbar />
        <CssBaseline />
        <Header setCoordinates={setCoordinates} onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
        <Grid container spacing={3} style= {{ width : '100%' }}>
            <Grid item xs={12} md={4}>
                <List 
                    places={setFilter ? filteredPlaces : places} 
                    childClicked = {childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    places={setFilter ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
        </>
    );
}

export default MapPage;