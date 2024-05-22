import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardActions, Chip, CardContent } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaceIcon from '@mui/icons-material/Place';
import { styled } from '@mui/material/styles';

import useStyles from './styles';

function PlaceDetails({ place, selected, refProp}){
    const classes = useStyles();
    const navigate = useNavigate();
    const userid = useSelector((state) => state.user?._id);

    if(selected) refProp?.current?.scrollIntoView({ behavior : "smooth", block: "start" });

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        // '& .MuiRating-iconHover': {
        //   color: '#ff3d47',
        // },
      });

    return(
        <Card elevation={6}
        onClick={(e)=>{
            if(userid){
                e.stopPropagation();
                navigate(`/place/${place._id}`);
                navigate(0);
            }
            else{
                e.stopPropagation();
                navigate(`/register`);
                navigate(0);
            }
        }}>
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
                    {/* <Rating value={Number(place.avgRating)} readOnly /> */}
                    <StyledRating name="read-only"
                                            size="small"
                                            value={Number(place.avgRating)}
                                            icon={<FavoriteIcon fontSize="inherit" />}
                                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                            readOnly
                                    />
                    {place.postCount && (
                    <Typography gutterBottom variant="subtitle1">out of {place.postCount} reviews</Typography>
                    )}
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