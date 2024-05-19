import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const PostHeader = ({ isPostHeader, postUserId, userId, postPlaceId, name, userPicturePath, friendIds, setFriendIds }) => {

    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    
    const [displayName, setDisplayName]=useState(name);
    const [displayUserPicturePath, setDisplayUserPicturePath]=useState(userPicturePath);
    const [isFriend, setIsFriend] = useState(false);
    const [place, setPlace] = useState(null);
    const [placeInfo, setPlaceInfo] = useState("");

    
  const getUserInfo = async (postUserId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${postUserId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDisplayName(data.firstName + ' ' + data.lastName);
      setDisplayUserPicturePath(data.picturePath);
      // setFriendIds(data.friends);
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  }

    
    const getPlaceFromPlaceId = async (postPlaceId) =>{
      // console.log("inside getPlace")
      try{
          const response = await fetch(`http://localhost:3001/places/${postPlaceId}`, {
              method:"GET",
              headers: {Authorization: `Bearer ${token}`},
          });
          const data = await response.json();
          // console.log("place fetched: ",data.place);
          const fetchedPlace = data.place[0];
          const { street, city, province, country } = fetchedPlace.address;
          let label = fetchedPlace.name;
          if (street) label += `, ${street}`;
          if (city) label += `, ${city}`;
          if (province) label += `, ${province}`;
          if (country) label += `, ${country}`;

          setPlace(fetchedPlace[0]);
          setPlaceInfo(label);
      }
      catch(error){
          console.log("Error: ", error.message)
          console.error("Error fetching place info:", error.message);
      }
  }

      const handleFriend = async (postUserId, userId) => {
        try {
            const response = await fetch(`http://localhost:3001/users/friend/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",  },
                body: JSON.stringify({postUserId: postUserId})
            });
            if (response.ok) {
                setIsFriend(!isFriend);
                // if(isFriend){
                //   setFriendIds(...friendIds, postUserId);
                // }
                // else{
                //   setFriendIds(friendIds.filter((friendId => friendId !== postUserId)))
                // }
                if (isFriend) {
                  setFriendIds(friendIds.filter((friendId) => friendId !== postUserId));
                } else {
                  setFriendIds([...friendIds, postUserId]);
                }
            } else {
                console.error('Failed to friend:', response.statusText);
            }
        } catch (error) {
            console.error('Error friending:', error.message);
        }
      }

      const getIsFriendFromUserId = async (postUserId, userId) =>{
        const response = await fetch(
          `http://localhost:3001/users/isFriend/${userId}`,
          {
            method:"POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({postUserId})
          }
        );
        const data = await response.json();
        // console.log(data);
        setIsFriend(data.isFriend);

      }
      useEffect(() =>{
        // console.log(name, userPicturePath)
        getIsFriendFromUserId(postUserId, userId);
        if(isPostHeader){
          getPlaceFromPlaceId(postPlaceId);
          getUserInfo(postUserId);
        }
        else
          getUserInfo(postUserId);
      }, []);

      useEffect(()=>{
        getIsFriendFromUserId(postUserId, userId);
      }, [friendIds])

      return(
        <FlexBetween >
            <FlexBetween gap="1rem">
                <UserImage image={displayUserPicturePath} size="55px" />
                <Box
                onClick={() => {
                 navigate(`/profile/${postUserId}`);
                 navigate(0);
                }}
                >
                <Typography
                color={"#8a1f5a"}
                variant="h5"
                fontWeight={"500"}
                sx={{ 
                    "&:hover":{ cursor: "pointer" }}}
                    >
                    {displayName}
                    </Typography>
                    {isPostHeader ? (
                      <Typography 
                        color={"#8a1f5a"}
                        backgroundColor={"yellow"} 
                        fontSize="0.75rem"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/place/${postPlaceId}`);
                          navigate(0);
                         }}
                      >{placeInfo} </Typography>
                    ) : null}
                    </Box>
                    </FlexBetween>
                    {postUserId == userId ? null : (
                    <IconButton
                      onClick={()=>handleFriend(postUserId, userId)}
                      sx={{backgroundColor: "#F4F4F4",  p:"0.6rem"}}
                    >
                        {isFriend ? (<PersonRemoveOutlined 
                        sx={{color: "#8a1f5a"}}/>) : (<PersonAddOutlined   sx={{color: "#8a1f5a"}} />)}
                    </IconButton>
                    )}
        </FlexBetween>
      )



};

export default PostHeader;