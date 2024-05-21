import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import PostWidget from '../widgets/PostWidget';
import { setSavedPosts } from '../state'; 

import WidgetWrapper from '../components/WidgetWrapper';

function SavedPosts() {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const savedPosts = useSelector((state) => state.savedPosts); 
  const dispatch = useDispatch();

  // console.log(userId);


  const getSavedPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/savedPost/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // console.log(data);
      // console.log("these are the saved posts")
      const postIds = data.map(savedPost => savedPost.postId); 
     
    //  console.log(postIds)
      const postsResponse = await fetch('http://localhost:3001/posts/getPostsByIds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postIds }),
      });
      const postsData = await postsResponse.json();
      dispatch(setSavedPosts({ savedPosts: [...postsData] }));

   
      // console.log(postsData)
      // console.log("these are the saved posts data")
    } catch (error) {
      console.log(error);
    }
  };
  console.log(savedPosts) 
  useEffect(() => {
    getSavedPosts();
  }, []);

//  savedPosts.map((post) => console.log(post));
 
  return (
    <>
      <Navbar />
      <Box position="relative" marginTop="10%">
        <h1>Saved Posts</h1>
      </Box>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        >
        <WidgetWrapper>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2} // gap between posts
            width={isNonMobileScreens ? '60%' : '90%'}
            margin="0 auto"
          >
            {savedPosts.map((savedpost, index) => (
              <Box key={index} width="100%">
                <PostWidget
                  key={savedpost._id}
                  postId={savedpost._id}
                  postUserId={savedpost.userId}
                  userId={userId}
                  postPlaceId={savedpost.placeId}
                  textContent={savedpost.textContent}
                  picturePaths={savedpost.picturePaths}
                />
              </Box>
            ))}
          </Box>
        </WidgetWrapper>
      </Box>
    </>
    );
  } 
  


export default SavedPosts;
