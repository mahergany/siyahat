import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardActions, Chip, CardContent } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

function PlaceDetails({ place, selected, refProp}){
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({ behavior : "smooth", block: "start" });

    return(
        <Card elevation={6}>
            {place.photos.length ? (

            <CardMedia 
                style={{ height: 350}}
                image={place.photos[0]}
                    // 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    title={place.name}
            />
            ) : null}
            <CardContent>
                <Typography gutterBottom variant="h5" >{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.avgRating)} readOnly />
                    <Typography gutterBottom variant="subtitle1">out of {place.postCount} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.priceLevel}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.placeRanking}</Typography>
                </Box>
                {/* {place.address.length ? (
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography gutterBottom variant="subtitle1">{
                            place.address.forEach((place, index) =>{
                                if(i!==(place.address-1)){
                                    return place.address +", "
                                }
                                else
                                    return place.address
                            })
                        }</Typography>
                    </Box>
                ) : null} */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Address</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.address.street ? (`${place.address.street}, `): null }
                        {place.address.city ? (`${place.address.city}, `): null }
                        {place.address.province ? (`${place.address.province}, `): null }
                        {place.address.country ? (`${place.address.country}`): null }
                        {/* {`${place.address.street}, ${place.address.city}, ${place.address.province}, ${place.address.country}`} */}
                    </Typography>
                </Box>
                {/* <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.placeRanking}</Typography>
                </Box> */}
                {/* {place?.awards?.map((award)=>(
                    <Box my={1} display="flex" justifyContent="space-between">
                        <img src={award.images.small} alt={award.display_name}></img>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))} */}
                {place?.tags?.map((tag, index)=>(
                    <Chip key={`${tag}-${index}`} size="small" label={tag} className={classes.chip} />
                ))}
                {/* {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle} >
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing} >
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )} */}
                {/* <CardActions>
                    <Button size="small" color="primary" onClick={()=> window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={()=> window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions> */}
            </CardContent>
        </Card>
    );
}

export default PlaceDetails