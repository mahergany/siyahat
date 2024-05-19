import React from 'react'
import {Box, useMediaQuery} from "@mui/material";
import { useSelector } from 'react-redux';
import Navbar  from "../components/Navbar";
import UserWidget from "../widgets/UserWidget.jsx"
import MyPostWidget from "../widgets/MyPostWidget.jsx"
import PostsWidget from '../widgets/PostsWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import { useState } from 'react';



const Community=()=> {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  const [friendIds, setFriendIds] = useState([]); //to sync users across PostWidget and FriendListWidget components

  return(
    <Box mt="7rem" bgcolor="rgb(247,245,235)">
    <Navbar />
    <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath = {picturePath}/>
          <PostsWidget userId={_id} friendIds={friendIds} setFriendIds={setFriendIds} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
              <Box m="2rem 0" />
            <FriendListWidget userId={_id} friendIds={friendIds} setFriendIds={setFriendIds} />
            </Box>
          )}
    </Box>
    </Box>
  );
  
};

export default Community;
