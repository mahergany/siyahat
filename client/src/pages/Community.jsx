import React from 'react'
import {Box, useMediaQuery, CssBaseline} from "@mui/material";
import { useSelector } from 'react-redux';
import Navbar  from "../components/Navbar";
import UserWidget from "../widgets/UserWidget.jsx"
import MyPostWidget from "../widgets/MyPostWidget.jsx"
import PostsWidget from '../widgets/PostsWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import { useState } from 'react';
import SearchWidget from '../widgets/SearchWidget.jsx';



const Community=()=> {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  const [friendIds, setFriendIds] = useState([]); //to sync users across PostWidget and FriendListWidget components

  return(
   <>
   <CssBaseline/>
    <Navbar />
    <Box 
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
       
      >
        <Box mt="7rem" ml="2rem" flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        
        </Box>
       
        <Box      mt="7rem"
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        // mt={isNonMobileScreens ? undefined : "2rem"}
   
        >
          <MyPostWidget  picturePath = {picturePath}/>
          <PostsWidget userId={_id} friendIds={friendIds} setFriendIds={setFriendIds} />
        </Box>
        
          <Box flexBasis="26%"
          mt="7rem">
              <Box  />
            <FriendListWidget userId={_id} friendIds={friendIds} setFriendIds={setFriendIds} />
            <Box mt="1rem">
         < SearchWidget/>
         </Box>

            </Box>
          
       
    </Box>
    </>
    
  );
  
};

export default Community;