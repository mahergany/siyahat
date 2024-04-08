import React from 'react'

function PlaceDetails(props){
    const place = props.place;
    return(
        <h1>{place.name}</h1>
    );
}

export default PlaceDetails