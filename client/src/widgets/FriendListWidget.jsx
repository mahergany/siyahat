import { Box, Typography } from "@mui/material";
import PostHeader from '../components/PostHeader';
import WidgetWrapper from "../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const FriendListWidget = ({ userId, friendIds, setFriendIds }) => {
  const dispatch = useDispatch();
  // const [name, setName] = useState("");
  // const [userPicturePath, setUserPicturePath] = useState("");
  // const [friendIds, setFriendIds] = useState(friendIds || []);
try{
  const token = useSelector((state) => state.token);

  const getUserInfo = async (postUserId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${postUserId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // setName(data.firstName + ' ' + data.lastName);
      // setUserPicturePath(data.picturePath);
      setFriendIds(data.friends || []);
      console.log(data.friends);
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  }

  // const getFriends = async (userId) => {
  //   try {
  //     console.log("getting friends for: ", userId)
  //     const response = await fetch(
  //       `http://localhost:3001/users/friends/${userId}`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     setFriendIds(data.friendIds);
  //     // Optionally, you could also dispatch this data to the Redux store
  //     // dispatch(setFriends({ friends: data }));
  //   } catch (error) {
  //     console.error("Error fetching friends:", error.message);
  //   }
  // };

  useEffect(() => {
    // console.log(userId)
    // getFriends(userId);
    getUserInfo(userId)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color="#0BB2A2"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {/* {friendIds && friendIds.length && friendIds.map((friendId) => (
          <PostHeader
            key={friendId}
            postUserId={friendId}
            userId={userId}
            friendIds={friendIds}
            setFriendIds={setFriendIds}
            // name={name}
            // userPicturePath={userPicturePath}
          />
        ))} */}
        {Array.isArray(friendIds) && friendIds.length > 0 ? (
          friendIds.map((friendId) => (
            <PostHeader
              key={friendId}
              postUserId={friendId}
              userId={userId}
              friendIds={friendIds}
              setFriendIds={setFriendIds}
            />
          ))
        ) : (
          <Typography>No friends.</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
}
catch(error){
  console.log(error);
}
};

export default FriendListWidget;