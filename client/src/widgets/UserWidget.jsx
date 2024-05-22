import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import UserImage from "../components/UserImage";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



// Define your custom colors
const customColors = {
  dark: "#333",
  medium: "#666",
  main: "#000",
};

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { dark, medium, main } = customColors; 
  const loggedInUserId = useSelector((state) => state.user._id);
  const [newOccupation, setNewOccupation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [edit, setedit] = useState(0);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  
  const handleEditOccupation = async () => {
    const requestBody = {
      newOccupation: newOccupation, 
  };
    try {
        const response = await fetch(`http://localhost:3001/users/${userId}/occupation`, {
            method: "POST",
            headers: {
         
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        setUser((prevUser) => ({
          ...prevUser,
          occupation: newOccupation,
        }));
        

        const responseData = await response.json();
        console.log(responseData.message);
        
    } catch (error) {
        console.error('Error editing occupation:', error.message);
    }
};



  

  const handleEditLocation = async () => {
    const requestBody = {
      newLocation: newLocation, 
  };
    try {
        const response = await fetch(`http://localhost:3001/users/${userId}/location`, {
            method: "POST",
            headers: {
         
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        setUser((prevUser) => ({
          ...prevUser,
          location: newLocation,
        }));
        
        const responseData = await response.json();
        console.log(responseData.message);
        
    } catch (error) {
        console.error('Error editing occupation:', error.message);
    }
  };

  const handleInputChange = (event) => {
    setNewOccupation(event.target.value);
  };

  const handleInputChangeloc = (event) => {
    setNewLocation(event.target.value);
  };

  useEffect(() => {
    getUser();
  }, [userId, token]);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
  } = user;

  return (
    <WidgetWrapper  customColor={"#8A1F5A"}>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h6"
              color="white"
              fontWeight="600"
              sx={{
                "&:hover": {
                  color: "white", // Use custom main color
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={"white"}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{color:"white"}} />
      </FlexBetween>

      
      <Divider sx={{bgcolor:"#d3d3d3"}}/>
      <Divider sx={{bgcolor:"#d3d3d3"}}/>
     


      <Box p="1rem 0">
      {userId === loggedInUserId && (
  <>
    <IconButton onClick={() => setedit(!edit)}>
      <EditOutlined sx={{color:"white"}} />
    </IconButton>
  </>
)}

  {/* Location Row */}
  <Box display="flex" alignItems="center" justifyContent="space-between" mb="0.5rem">
    <Box display="flex" alignItems="center" gap="1rem">
      <LocationOnOutlined fontSize="large" sx={{ color: "white" }} />
      <Typography color={"white"}>{location}</Typography>
    </Box>
  
  { edit && 
  (<> <Box display="flex" alignItems="center" gap="1rem"> {/* Add an input field */}
        <input 
          type="text" 
          value={newLocation} 
          onChange={handleInputChangeloc} 
          placeholder="Enter new occupation"
          style={{
            borderRadius: '1rem',
            padding: '0.5rem 1rem', 
            border: '1px solid #ccc',
            width: '100%',
            outline: 'none',
            boxSizing: 'border-box', 
            marginLeft:"1rem"
          }}
        />
         </Box>
     <IconButton onClick={handleEditLocation}>
        <EditOutlined sx={{ color: "white" }} />
      </IconButton>
  
  </>) }

  </Box>
  {/* Occupation Row */}
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" alignItems="center" gap="1rem">
      <WorkOutlineOutlined fontSize="large" sx={{ color: "white" }} />
      <Typography color={"white"}>{occupation}</Typography>
    </Box>
    { edit && 
     (<><Box display="flex" alignItems="center" gap="1rem"> {/* Add an input field */}
       <input 
          type="text" 
          value={newOccupation} 
          onChange={handleInputChange} 
          placeholder="Enter new occupation"
                    style={{
            borderRadius: '1rem',
            padding: '0.5rem 1rem', 
            border: '1px solid #ccc',
            width: '100%',
            outline: 'none',
            boxSizing: 'border-box', 
            marginLeft:"1rem"
          }}
        />
         </Box>
    <IconButton onClick={handleEditOccupation}>
        <EditOutlined sx={{ color: "white" }} />
      </IconButton>
       </>) }
  </Box>
</Box>

      <Divider sx={{bgcolor:"#E0E0E0"}}/>

  

      <Divider sx={{bgcolor:"#d3d3d3"}}/>

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={"white"} fontWeight="600" mb="1rem" textAlign="left">
          Social Profiles
        </Typography>

        {/* Your social profiles section */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={"white"} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={"white"}>Social Network</Typography>
            </Box>
          </FlexBetween>

          {userId === loggedInUserId && edit && (

            <>
            <Box display="flex" alignItems="center" gap="1rem"> {/* Add an input field */}
       <input 
          type="text" 
          value={newOccupation} 
          onChange={handleInputChange} 
          placeholder="Enter new Twiter"
          style={{
            borderRadius: '1rem',
            padding: '0.5rem 1rem', 
            border: '1px solid #ccc',
            width: '100%',
            outline: 'none',
            boxSizing: 'border-box', 
            marginLeft:"1rem"
          }}
        />
         </Box>
              <EditOutlined sx={{ color: "white" }} />
            </>
          )}
         
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={"white"} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={"white"}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {userId === loggedInUserId && edit && (
            <>
            <Box display="flex" alignItems="center" gap="1rem"> 
       <input 
          type="text" 
          value={newOccupation} 
          onChange={handleInputChange} 
          placeholder="Enter new linkdn"
          style={{
            borderRadius: '1rem',
            padding: '0.5rem 1rem', 
            border: '1px solid #ccc',
            width: '100%',
            outline: 'none',
            boxSizing: 'border-box', 
            marginLeft:"1rem"
          }}
        />
         </Box>
              <EditOutlined sx={{ color: "white" }} />
            </>
          )}
         
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
