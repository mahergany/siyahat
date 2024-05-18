import {
  DeleteOutlined,
  ImageOutlined,
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
} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/index";

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
    formData.append("picturePaths", JSON.stringify(picturePaths));

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImages([]);
    setPost("");
  };

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
      <FlexBetween gap="1.5rem" marginTop={"1rem"}>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: customColors.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
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
