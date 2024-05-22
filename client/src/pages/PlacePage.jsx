import { Box, useMediaQuery, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import PostWidget from "../widgets/PostWidget";
import { useSelector } from "react-redux";
import Rating from '@material-ui/lab/Rating';
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Chip} from "@mui/material";

import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaceIcon from '@mui/icons-material/Place';
import { styled } from '@mui/material/styles';


const PlacePage=()=>{
    try{
    const token = useSelector((state) => state.token);
    const { _id} = useSelector((state) => state.user);
    const userId = _id;
    const {placeId}=useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [place, setPlace] = useState({});
    const [label, setLabel] = useState("");
    const [showPosts, setShowPosts] = useState(true);
    const [posts, setPosts] = useState([]);
    const [allImages, setAllImages] = useState([]);
    // const [name, setName] = useState("");

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#D6356A',
        },
        // '& .MuiRating-iconHover': {
        //   color: '#ff3d47',
        // },
      });
    
    const getPlaceFromPlaceId = async (postPlaceId) =>{
        try{
            const response = await fetch(`http://localhost:3001/places/${postPlaceId}`, {
                method:"GET",
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = await response.json();
            // console.log(data)
            // console.log("places fetched: ",data.place);
            const fetchedPlace = data.place[0];
            // console.log(fetchedPlace)
            setPlace(fetchedPlace);
            // console.log(place);

            const { street, city, province, country } = fetchedPlace.address;
            let tempLabel = fetchedPlace.name;
            if (street) tempLabel += `, ${street}`;
            if (city) tempLabel += `, ${city}`;
            if (province) tempLabel += `, ${province}`;
            if (country) tempLabel += `, ${country}`;

            setLabel(tempLabel);
           
        }
        catch(error){
            console.log("Error: ", error.message)
            console.error("Error fetching place info:", error.message);
        }
    }

    const getPostsFromPlaceId = async(placeId) => {
        try{
            const response = await fetch(`http://localhost:3001/posts/${placeId}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            const data = await response.json();
            console.log(data);
            setPosts(data);
            const images = [];
            data.forEach(post => {
                const postPictures = post.picturePaths;
                if (postPictures.length > 0) {
                    images.push(...postPictures);
                }
            });
            setAllImages(images);
            console.log(allImages);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        console.log(allImages)
    }, [allImages])

    const handleChipClick = (isPostsChip) => {
        setShowPosts(isPostsChip);
      };    

    useEffect(()=>{
        // console.log(placeId);
        getPlaceFromPlaceId(placeId);
        getPostsFromPlaceId(placeId);
    },[]);

    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(label)}`;

    return(
        <Box>
            <Navbar />
            <Box
            // marginTop={"10%"} 
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >

            {/* <WidgetWrapper marginTop={"10%"} customColor={"#8A1F5A"} > 
                <Box  flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <FlexBetween>
                        <Typography 
                        // color={"#8a1f5a"}
                            variant="h3"
                            fontWeight={"600"}
                            color="white"
                            // sx={{ "&:hover":{ cursor: "pointer" }}}
                        >{place.name}</Typography>
                        <StyledRating name="read-only"
                                            // size="small"
                                            value={Number(place.avgRating)}
                                            icon={<FavoriteIcon fontSize="inherit" />}
                                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                            readOnly
                                    />
                    </FlexBetween>
                </Box>
            </WidgetWrapper> */}
            <WidgetWrapper marginTop={"10%"} customColor={"#8A1F5A"}> 
    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <FlexBetween>
            <Typography
                variant="h3"
                fontWeight={"600"}
                color="white"
            >
                {place.name}
            </Typography>
            <Box marginLeft="1rem"> {/* Adjust the margin as needed */}
                <StyledRating 
                    name="read-only"
                    value={Number(place.avgRating)}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                />
            </Box>
        </FlexBetween>
    </Box>
</WidgetWrapper>
            </Box>

            <Box
                // marginTop={"0.1rem"}
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="2rem"
                justifyContent="center"
                flexDirection={isNonMobileScreens ? "row" : "column"}
            >
                <WidgetWrapper flexBasis="50%" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} customColor="#8A1F5A">
                    <Typography variant="h4" 
                    // color={"#8a1f5a"}
                    fontWeight={"700"}
                    color={"white"}>Info</Typography>
                    {place.category && (
                    <FlexBetween>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Category</Typography>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.category}</Typography>
                    </FlexBetween>
                    )}
                    {place.type && (
                    <FlexBetween>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Type</Typography>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.type}</Typography>
                    </FlexBetween>
                    )}
                    {place.description && (
                    <FlexBetween>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Description</Typography>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.description}</Typography>
                    </FlexBetween>
                    )}
                    {place.postCount && (
                    <FlexBetween>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Post Count</Typography>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.postCount}</Typography>
                    </FlexBetween>
                    )}
                    {place.avgRating && (
                    <FlexBetween>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Average Rating</Typography>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.avgRating}</Typography>
                    </FlexBetween>
                    )}
                    {place.priceLevel && (
                    <FlexBetween>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Price Level</Typography>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.priceLevel}</Typography>
                    </FlexBetween>
                    )}
                    {place.name && (
                    <FlexBetween>
                        <Typography
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>More Info</Typography>
                        <a style={{color: "white"}} href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
                        Search on Google<OpenInNewIcon fontSize="small"></OpenInNewIcon>
                        </a>
                    </FlexBetween>
                    )}
                </WidgetWrapper>
                <WidgetWrapper flexBasis="50%"  display={"flex"} flexDirection={"column"} justifyContent={"space-between"} customColor="#8A1F5A">
                    <Typography variant="h4" 
                    // color={"#8a1f5a"}
                    color={"white"}
                    fontWeight={"700"}
                    >Map</Typography>
                    {place.latitude && (
                    <FlexBetween>
                        <Typography color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Latitude</Typography>
                        <Typography 
                        color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.latitude}</Typography>
                    </FlexBetween>
                    )}
                    {place.longitude && (
                    <FlexBetween>
                        <Typography color={"white"}
                        variant="h6"
                    fontWeight={"700"}>Longitude</Typography>
                        <Typography color={"white"}
                        variant="h6"
                    fontWeight={"700"}>{place.longitude}</Typography>
                    </FlexBetween>
                    )}
                    {place.latitude && place.longitude && (
                    <FlexBetween>
                        {/* <a href="/">Open in Google Maps</a> */}
                        <iframe width={"100%"} src={`https://maps.google.com/maps?q=${place.latitude},${place.longitude}&hl=es;&output=embed`}></iframe>
                        
                    </FlexBetween>
                    )}
                </WidgetWrapper>
            </Box>
            <Box
                // marginTop={"0.5rem"}
                width="100%"
                // padding="2rem 6%"
                // padding="0.1rem 6%"
                display="flex"
                gap="2rem"
                justifyContent="center"
                flexDirection={isNonMobileScreens ? "row" : "column"}
            >
                <WidgetWrapper customColor="null">
                    <FlexBetween>
                    <Chip
                                label="Posts"
                                clickable
                                onClick={() => handleChipClick(true)}
                                sx={{
                                    fontSize: "1rem",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: showPosts ? "#8a1f5a" : undefined,
                                    color: showPosts ? "white" : undefined
                                }}
                            />
                            <Chip
                                label="Gallery"
                                clickable
                                onClick={() => handleChipClick(false)}
                                sx={{
                                    fontSize: "1rem",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: !showPosts ? "#8a1f5a" : undefined,
                                    color: !showPosts ? "white" : undefined
                                }}
                            />
                    </FlexBetween>
                </WidgetWrapper>
            </Box>
            <Box
                // marginTop={"0.5rem"}
                width="100%"
                padding={showPosts ? "0.1rem 20%" : "0.1rem 6%"}
                display="flex"
                gap="2rem"
                justifyContent="center"
                flexDirection={isNonMobileScreens ? "row" : "column"}
            >

                {/* <WidgetWrapper> */}
                    {showPosts ? (
                        <>
                        {/* <Typography>Posts</Typography> */}
                        {posts && posts.map((post) => (
                            <PostWidget 
                                key={post._id}
                                postId={post._id}
                                postUserId={post.userId}
                                userId={userId}
                                postPlaceId={post.placeId}
                                textContent={post.textContent}
                                picturePaths={post.picturePaths}
                            />
                        ))}
                        {!posts.length && (
                            <Typography>No Posts Uploaded</Typography>
                        )}
                        </>
                    ) : (
                        <>
                            {/* <Typography>Gallery</Typography> */}
                            {/* {allImages && allImages.map(image => (
                                 <img
                                 width="100%"
                                 height="auto"
                                 alt='post'
                                 style={{borderRadius:"0.75rem", marginTop:"0.75rem"}}
                                 src={`http://localhost:3001/assets/${image}`}
                                 />
                            ))} */}
                             <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="1rem">
                                {allImages && allImages.map((image, index) => (
                                    <img
                                        key={index}
                                        width="100%"
                                        height="auto"
                                        alt='post'
                                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                                        src={`http://localhost:3001/assets/${image}`}
                                    />
                                ))}
                            </Box>
                            {!allImages.length && (
                                <Typography>No Images Uploaded</Typography>
                            )}
                        </>
                    )}
                {/* </WidgetWrapper> */}
            </Box>
        </Box>
    );
}
catch(error){
    console.error(error);
}
}

export default PlacePage;