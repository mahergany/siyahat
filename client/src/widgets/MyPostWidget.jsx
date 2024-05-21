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

  
  //place form
  const [open, setOpen] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [zoomLevel, setZoomLevel] = useState(14);

  const [ratingValue, setRatingValue] = useState(2);
  const [ratingHover, setRatingHover] = useState(-1);
  const [priceLevel, setPriceLevel] = useState(2);

  const handleOpenCreatePlace = () => {
    console.log("inside handle open")
    setOpen(true);
  }
  const handleCloseCreatePlace = () =>{
    setOpen(false);
  }
  const handleCheckboxChange = (event) => {
    setUseCurrentLocation(event.target.checked);
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
        setCoordinates({ lat: latitude, lng: longitude});
    });
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

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("textContent", post);
    formData.append("placeId", placeId);
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
            label="Name"
            type="string"
            fullWidth
            variant="standard"
          />
          {/* <TextField 
            autoFocus
            margin="dense"
            id="description"
            name="Description"
            label="Description"
            type="string"
            fullWidth
            variant="standard"
          /> */}
          <FormControlLabel 
            control={<Checkbox checked={useCurrentLocation} onChange={handleCheckboxChange} />} 
            label="Use current latitude and longitude" 
          />
          {!useCurrentLocation && (
            <>
              <TextField 
                margin="dense"
                id="latitude"
                name="latitude"
                label="Latitude"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField 
                margin="dense"
                id="longitude"
                name="longitude"
                label="Longitude"
                type="number"
                fullWidth
                variant="standard"
              />
            </>
          )}
          {/* {!useCurrentLocation && (
            <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                center={coordinates}
                zoom={zoomLevel}
                options={{ disableDefaultUI: true, zoomControl: true }}
              />
            </div>
          )} */}
          <TextField 
            autoFocus
            margin="dense"
            id="street"
            name="street"
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
            label="Province"
            type="string"
            fullWidth
            variant="standard"
          />
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
        <Typography>Price Level</Typography>
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
