import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {

   

      const dispatch = useDispatch();
      const { _id } = useSelector((state) => state.user);
      const token = useSelector((state) => state.token);
      const navigate = useNavigate();
      const friends = useSelector((state) => state.user.friends);

      const isFriend = friends.find((friend) => friend._id === friendId);

      const patchFriend = async (type) => {
        const response = await fetch(
          `http://localhost:3001/friends/${type}/${_id}/${friendId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        dispatch(setFriends({friends: data}));
      };

      return(
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                onclick={() => {
                 navigate(`/profile/${friendId}`);
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
                    {name}
                    </Typography>
                    <Typography color={"#8a1f5a"} fontSize="0.75rem" >{subtitle} </Typography>
                    </Box>
                    </FlexBetween>
                    <IconButton
                    onClick={()=>patchFriend()}
                    sx={{backgroundColor: "#F4F4F4",  p:"0.6rem"}}
                    >
                        {isFriend ? (<PersonRemoveOutlined 
                        sx={{color: "#8a1f5a"}}/>) : (<PersonAddOutlined   sx={{color: "#8a1f5a"}} />)}
                    </IconButton>
              

        </FlexBetween>
      )



};

export default Friend;