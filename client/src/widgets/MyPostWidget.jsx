import {
  DeleteOutlined,
  ImageOutlined,
  AddReactionOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
  useMediaQuery,
  Autocomplete,
  TextField,
  FormControlLabel,

} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/index";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import GoogleMapReact from 'google-map-react';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyPostWidget.css"
import { SiCounterstrike } from "react-icons/si";

// import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";


const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [images, setImages] = useState([]);
  const [post, setPost] = useState("");
  const [placeId, setPlaceId] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [allPlaces, setAllPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [options, setOptions] = useState([]);

  const [ratingValue, setRatingValue] = useState(2);
  const [ratingHover, setRatingHover] = useState(-1);
  const [priceLevel, setPriceLevel] = useState(2);
  
  //place form
  const [open, setOpen] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [coordinates, setCoordinates] = useState({lat: 33.64178740146194, lng: 72.9917736052812});
  // const [coordinates, setCoordinates] = useState({});
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceLatitude, setNewPlaceLatitude] = useState('');
  const [newPlaceLongitude, setNewPlaceLongitude] = useState('');
  const [newPlaceStreet, setNewPlaceStreet] = useState('');
  const [newPlaceCity, setNewPlaceCity] = useState('');
  const [newPlaceProvince, setNewPlaceProvince] = useState('');
  const [newPlaceCategory, setNewPlaceCategory] = useState('Restaurant') ;

  const mapRef = useRef();
  const [center, setCenter] = useState({lat: 13, lng: 80});
  const ZOOM_LEVEL =11;


  const handleOpenCreatePlace = () => {
    console.log("inside handle open")
    navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
      console.log("current location is ", latitude, longitude)
        setCoordinates({ lat: latitude, lng: longitude});
        setNewPlaceLatitude(latitude);
        setNewPlaceLongitude(longitude);
  })
    setOpen(true);
  }
  const handleCloseCreatePlace = () =>{
    setOpen(false);
  }
  const handleCheckboxChange = (event) => {
    setUseCurrentLocation(event.target.checked);
    navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude});
            setNewPlaceLatitude(latitude);
            setNewPlaceLongitude(longitude);
    })
  };

  // useEffect(() => { 
  //   // if(useCurrentLocation){
  //     navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
  //       setCoordinates({ lat: latitude, lng: longitude});
  //       setNewPlaceLatitude(latitude);
  //       setNewPlaceLongitude(longitude);
  //   })
  // // }
  // }, [useCurrentLocation])

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  useEffect(() => {
    //   navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
    //     console.log("current location is ", latitude, longitude)
    //       setCoordinates({ lat: latitude, lng: longitude});
    //       setNewPlaceLatitude(latitude);
    //       setNewPlaceLongitude(longitude);
    // })
}, []);


  const [showEmojis, setShowEmojis] = useState(false);

  // Fetching all places for autocomplete
  const getAllPlaces = async () => {
    try {
      const response = await fetch(`http://localhost:3001/places`, {
        method: "GET",
      });
      const data = await response.json();
      setAllPlaces(data);

      const newOptions = data.map((item) => {
        const { name, address, _id } = item;
        const { street, city, province, country } = address;

        let label = name;
        if (street) label += `, ${street}`;
        if (city) label += `, ${city}`;
        if (province) label += `, ${province}`;
        if (country) label += `, ${country}`;

        return { label: label, id: _id };
      });
      setOptions(newOptions);
    } catch (error) {
      console.log("Error fetching places: ", error);
    }
  };

  // Define your custom colors here
  const customColors = {
    neutral: {
      light: "#F4F4F4",
      medium: "#CCCCCC",
      mediumMain: "#999999",
    },
    primary: {
      main: "#8a1f5a",
    },
    background: {
      alt: "#FFFFFF",
    },
  };

  const mediumMain = customColors.neutral.mediumMain;
  const medium = customColors.neutral.medium;

  const handleCreatePlace = async () => {
    console.log("inside handleCreatePlace")
    const formData = new FormData();
    formData.append("name", newPlaceName);
    formData.append("category", newPlaceCategory);
    formData.append("latitude", newPlaceLatitude);
    formData.append("longitude", newPlaceLongitude);
    formData.append("street", newPlaceStreet);
    formData.append("city", newPlaceCity);
    formData.append("province", newPlaceProvince);

    const response = await fetch(`http://localhost:3001/places/createPlace/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    // const place = await response.json();
    setOpen(false);
  }

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("textContent", post);
    formData.append("placeId", placeId);
    formData.append("priceLevel", priceLevel);
    formData.append("rating", ratingValue);
    images.forEach((image, index) => {
      formData.append(`pictures[${index}]`, image);
    });

    const picturePaths = images.map(image => image.name);
    console.log(picturePaths);
    formData.append("pictures", JSON.stringify(picturePaths));

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImages([]);
    setPost("");
    
    //place stats update
    // const formData2 = new FormData();
    // formData.append("rating", ratingValue);
    // formData.append("priceLevel", priceLevel);
    const updateData = {
      rating: ratingValue,
      priceLevel: priceLevel,
    };
    const response2 = await fetch(`http://localhost:3001/places/updateStats/${placeId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response2.ok) {
      console.error("Failed to update place stats:", await response2.text());
    }
  };

  // const addEmoji = (e) => {
  //   let sym = e.unified.split("-");
  //   let codesArray = [];
  //   sym.forEach((el) => codesArray.push("0x" + el));
  //   let emoji = String.fromCodePoint(...codesArray);
  //   setInput(input + emoji);
  // };


  useEffect(() => {
    getAllPlaces();
  }, []);

  const Markers = () => {

    const map = useMapEvents({
        click(e) {                                
            setCoordinates([
                e.latlng.lat,
                e.latlng.lng
            ]);             
            setNewPlaceLatitude(e.latlng.lat);  
            setNewPlaceLongitude(e.latlng.lng);  
        },            
    })

    return (
        coordinates ? 
            <Marker           
            key={coordinates.lat}
            position={coordinates}
            interactive={false} 
            />
        : null
    )   
}

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
      </FlexBetween>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Place" />}
        value={selectedPlace}
        onChange={(event, newValue) => {
          setPlaceId(newValue ? newValue.id : "");
          setSelectedPlace(newValue);
        }}
        sx={{
          width: "100%",
          backgroundColor: customColors.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
      />
      <Typography onClick={handleOpenCreatePlace} >Can't Find Place?</Typography>
      
      <Dialog
        open={open}
        onClose={handleCloseCreatePlace}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Place</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a Place to Add to our Database!
          </DialogContentText>
          <TextField 
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            value={newPlaceName}
            onChange={(event) => {setNewPlaceName(event.target.value); }}
            label="Name"
            type="string"
            fullWidth
            variant="standard"
          />
          <FlexBetween>
          <Typography>Category</Typography>
           <Select
           width="100%"
          labelId="category"
          id="category"
          value={newPlaceCategory}
          onChange={(event) => {setNewPlaceCategory(event.target.value)}}
          label="Category"
        >
          <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"attraction"}>Attraction</MenuItem>
        </Select>
          </FlexBetween>
          <FormControlLabel 
            control={<Checkbox checked={useCurrentLocation} onChange={handleCheckboxChange} />} 
            label="Use current latitude and longitude" 
          />
          {/* {!useCurrentLocation && ( */}
            <>
              <TextField 
                margin="dense"
                id="latitude"
                name="latitude"
                label="Latitude"
                onChange={(event) => {setNewPlaceLatitude(event.target.value)}}
                value={newPlaceLatitude}
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField 
                margin="dense"
                id="longitude"
                name="longitude"
                value={newPlaceLongitude}
                onChange={(event) => {setNewPlaceLongitude(event.target.value)}}
                label="Longitude"
                type="number"
                fullWidth
                variant="standard"
              />
              {!useCurrentLocation && coordinates && (
              <MapContainer
                width={"300px"}
                height={"400px"}
                  // center={coordinates || {lat: 33.004057,lng: 73.094667}}
                  center={coordinates}
                  zoom={ZOOM_LEVEL}
                  style={{ height: "400px", width: "100%", marginTop: "16px" }}
                  ref={mapRef}
              >
                <TileLayer url={"https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=fL1TkNsbFPOXNy4naOV4"} attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}></TileLayer>
                  <Markers />
          </MapContainer>

              )} 
              {useCurrentLocation && coordinates && (
                <MapContainer
                width={"300px"}
                height={"400px"}
                  center={coordinates}
                  zoom={ZOOM_LEVEL}
                  style={{ height: "400px", width: "100%", marginTop: "16px" }}
                  ref={mapRef}
              >
                <TileLayer url={"https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=fL1TkNsbFPOXNy4naOV4"} attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}></TileLayer>
                {useCurrentLocation && coordinates && (
                    <Marker           
                    position={coordinates}
                    interactive={false} 
                  />
                )}
          </MapContainer>

              )}
            </>
         {/* )}  */}
          
          <TextField 
            autoFocus
            margin="dense"
            id="street"
            name="street"
            value={newPlaceStreet}
            onChange={(event) => {setNewPlaceStreet(event.target.value)}}
            label="Street"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField 
            autoFocus
            margin="dense"
            id="city"
            name="city"
            value={newPlaceCity} 
            onChange={(event) => {setNewPlaceCity(event.target.value)}}
            label="City"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField 
            autoFocus
            margin="dense"
            id="province"
            name="province"
            value={newPlaceProvince} 
            onChange={(event) => {setNewPlaceProvince(event.target.value)}}
            label="Province"
            type="string"
            fullWidth
            variant="standard"
          />
         <Button
          // disabled={!post}
          onClick={handleCreatePlace}
          sx={{
            color: customColors.background.alt,
            backgroundColor: customColors.primary.main,
            borderRadius: "3rem",
            '&:hover': {
              backgroundColor: "#ac2572",
            },
          }}
        >
         CREATE PLACE
        </Button>
        </DialogContent>
      </Dialog>

      <FlexBetween gap="1.5rem" marginTop={"1rem"}>
        <InputBase
          placeholder="How was this place?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: customColors.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        {/* <IconButton
          onClick={() => setShowEmojis(!showEmojis)}
          
        >
          <AddReactionOutlined sx={{ color: mediumMain }} />
        </IconButton>
        {showEmojis && (
        <div>
          <Picker  onSelect={addEmoji}  />
        </div>
      )} */}
      </FlexBetween>
      <FlexBetween>
        <Typography>Rating:</Typography>
        <StyledRating name="customized-color"
        defaultValue={ratingValue}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={1}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setRatingHover(newHover);
        }}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}/>
      </FlexBetween>
      <FlexBetween>
        <Typography>Price Level: </Typography>
        <Select
          labelId="priceLevel"
          id="priceLevel"
          value={priceLevel}
          onChange={(event) => {setPriceLevel(event.target.value)}}
          label="Price Level"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={1}>$</MenuItem>
          <MenuItem value={2}>$$</MenuItem>
          <MenuItem value={3}>$$$</MenuItem>
          <MenuItem value={4}>$$$$</MenuItem>
        </Select>
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
           
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={(acceptedFiles) => setImages([...images, ...acceptedFiles])}
          >
            {({ getRootProps, getInputProps, open }) => (
              <Box>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${customColors.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!images.length ? (
                    <p>Add Images Here</p>
                  ) : (
                    <Box>
                      {images.map((image, index) => (
                        <FlexBetween key={index} sx={{ mb: 2 }}>
                          <Typography>{image.name}</Typography>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setImages(images.filter((_, i) => i !== index));
                            }}
                            sx={{ width: "15%" }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </FlexBetween>
                      ))}
                    </Box>
                  )}
                </Box>
                <Button
                  onClick={open}
                  sx={{
                    mt: 2,
                    color: customColors.background.alt,
                    backgroundColor: customColors.primary.main,
                    borderRadius: "3rem",
                    '&:hover': {
                      backgroundColor: "#ac2572",
                    },
                  }}
                >
                  Add Image
                </Button>
              </Box>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: customColors.background.alt,
            backgroundColor: customColors.primary.main,
            borderRadius: "3rem",
            '&:hover': {
              backgroundColor: "#ac2572",
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
