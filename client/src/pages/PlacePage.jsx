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
            marginTop={"10%"} 
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
            <WidgetWrapper>
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <FlexBetween>
                    <Typography color={"#8a1f5a"}
                        variant="h3"
                        fontWeight={"600"}
                        // sx={{ "&:hover":{ cursor: "pointer" }}}
                    >{place.name}</Typography>
                    
                        <Rating value={Number(place.avgRating)} readOnly />
                    </FlexBetween>
                </Box>
            </WidgetWrapper>
            </Box>

            <Box
          marginTop={"2rem"}
          width="100%"
          padding="2rem 6%"
          display="flex"
          gap="2rem"
          justifyContent="center"
          flexDirection={isNonMobileScreens ? "row" : "column"}
            >
                <WidgetWrapper flexBasis="50%">
                    <Typography variant="h5" color={"#8a1f5a"}>Info</Typography>
                    {place.category && (
                    <FlexBetween>
                        <Typography>Category</Typography>
                        <Typography>{place.category}</Typography>
                    </FlexBetween>
                    )}
                    {place.type && (
                    <FlexBetween>
                        <Typography>Type</Typography>
                        <Typography>{place.type}</Typography>
                    </FlexBetween>
                    )}
                    {place.description && (
                    <FlexBetween>
                        <Typography>Description</Typography>
                        <Typography>{place.description}</Typography>
                    </FlexBetween>
                    )}
                    {place.avgRating && (
                    <FlexBetween>
                        <Typography>Average Rating</Typography>
                        <Typography>{place.avgRating}</Typography>
                    </FlexBetween>
                    )}
                    {place.priceLevel && (
                    <FlexBetween>
                        <Typography>Price Level</Typography>
                        <Typography>{place.priceLevel}</Typography>
                    </FlexBetween>
                    )}
                    {place.name && (
                    <FlexBetween>
                        <Typography>More Info</Typography>
                        <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
                        Search on Google<OpenInNewIcon fontSize="small"></OpenInNewIcon>
                        </a>
                    </FlexBetween>
                    )}
                </WidgetWrapper>
                <WidgetWrapper flexBasis="50%">
                    <Typography variant="h5" color={"#8a1f5a"}>Map</Typography>
                    {place.latitude && (
                    <FlexBetween>
                        <Typography>Latitude</Typography>
                        <Typography>{place.latitude}</Typography>
                    </FlexBetween>
                    )}
                    {place.longitude && (
                    <FlexBetween>
                        <Typography>Longitude</Typography>
                        <Typography>{place.longitude}</Typography>
                    </FlexBetween>
                    )}
                    {place.latitude && place.longitude && (
                    <FlexBetween>
                        <a href="/">Open in Our Map</a>
                        
                    </FlexBetween>
                    )}
                </WidgetWrapper>
            </Box>
            <Box
                // marginTop={"0.5rem"}
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="2rem"
                justifyContent="center"
                flexDirection={isNonMobileScreens ? "row" : "column"}
            >
                <WidgetWrapper>
                    <FlexBetween>
                    <Chip
                        label="Posts"
                        clickable
                        onClick={() => handleChipClick(true)}
                        sx={{ backgroundColor: showPosts ? "#8a1f5a" : undefined, color: showPosts ? "white" : undefined }}
                    />
                    <Chip
                        label="Gallery"
                        clickable
                        onClick={() => handleChipClick(false)}
                        sx={{ backgroundColor: !showPosts ? "#8a1f5a" : undefined, color: !showPosts ? "white" : undefined }}
                    />
                    </FlexBetween>
                </WidgetWrapper>
            </Box>
            <Box
                // marginTop={"0.5rem"}
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="2rem"
                justifyContent="center"
                flexDirection={isNonMobileScreens ? "row" : "column"}
            >

                <WidgetWrapper>
                    {showPosts ? (
                        <>
                        <Typography>Posts</Typography>
                        {posts && posts.map((post) => (
                            <PostWidget 
                                key={post._id}
                                postId={post._id}
                                postUserId={post.userId}
                                userId={userId}
                                postPlaceId={post.placeId}
                                textContent={post.textContent}
                                picturePath={post.picturePath}
                            />
                        ))}
                        </>
                    ) : (
                        <>
                            <Typography>Gallery</Typography>
                            {allImages && allImages.map(image => (
                                 <img
                                 width="100%"
                                 height="auto"
                                 alt='post'
                                 style={{borderRadius:"0.75rem", marginTop:"0.75rem"}}
                                 src={`http://localhost:3001/assets/${image}`}
                                 />
                            ))}
                        </>
                    )}
                </WidgetWrapper>
            </Box>
        </Box>
    );
}
catch(error){
    console.error(error);
}
}

export default PlacePage;