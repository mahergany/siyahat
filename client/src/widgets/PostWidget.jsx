import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
} from '@mui/icons-material';

import { Box, Typography, IconButton, Divider , Button, InputBase} from '@mui/material';
import FlexBetween from '../components/FlexBetween';
import PostHeader from '../components/PostHeader';
import WidgetWrapper from '../components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../state';
import { useEffect } from 'react';
import UserImage from "../components/UserImage";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';

const PostWidget = ({
   
           postId,
            postUserId, // the user id of the post being displayed
            userId, //the user id of the person viewing
            postPlaceId,
            // name,
            textContent,
            // location,
            picturePaths,
            friendIds, 
            setFriendIds,
            // userPicturePath,
            // likes,
            // comments,
            priceLevel,
            rating,

}) => {
    let priceLevelDisplay=0;
    if(priceLevel>0)
        priceLevelDisplay = '$'.repeat(priceLevel);

    // console.log(postUserId);
    const [likes, setLikes] = useState([]);
    const [isComments, setIsComments] = useState(false);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const [isLiked, setIsLiked] = useState(false); 
    const [user, setUser] = useState();
    const[isSaved, setIsSaved] = useState(false);

    const [name, setName] = useState("");
    const [userPicturePath, setUserPicturePath ] = useState("");
    const [addComment, setAddComment] = useState(false);
    const [newComment, setNewComment ] = useState("");
    const [commentBoxes, setCommentBoxes] = useState([]);
    

    const [isLoading, setIsLoading] = useState(false);


    const getUserInfoForComments = async (comment) =>{
        // console.log("inside ", comment.userId);
        try{
            const response = await fetch(`http://localhost:3001/users/${comment.userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
            const commentUserInfo = await response.json(); //has the user info for a specific comment
            // console.log("Comment User Info : ", commentUserInfo)
            //format that will be used for printing comments
            const newCommentBox = {
                _id: comment._id,
                postId: comment.postId,
                commentUserId: comment.userId,
                commentText: comment.comment_text,
                commentPicturePath: commentUserInfo.picturePath,
                commentFirstName: commentUserInfo.firstName,
                commentLastName: commentUserInfo.lastName,
            }
            // console.log(newCommentBox.commentFirstName)
            // console.log(newCommentBox);
            // setCommentBoxes(prevCommentBoxes => [...prevCommentBoxes, newCommentBox]); //appending the current comment box object
            // console.log(commentBoxes);
            setCommentBoxes(prevCommentBoxes => {
                const exists = prevCommentBoxes.some(commentBox => commentBox._id === newCommentBox._id);
                if (exists) {
                    return prevCommentBoxes;
                }
                return [...prevCommentBoxes, newCommentBox];
            });
        }
        catch(error){
            console.error("Error fetching user info for comments:", error.message);
        }
    }

    /* USER INFO DATABASE FETCHING */
    const getUserInfo = async (postUserId) => {
        try{
            const response = await fetch(`http://localhost:3001/users/${postUserId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await response.json();
              setUser(data);
              setName(data.firstName + ' ' + data.lastName);
              setUserPicturePath(data.picturePath);
            //   console.log("User data is:",data);
        }
        catch(error){
            console.error("Error fetching user info:", error.message);
        }
    }

    /* LIKES DATABASE FETCHING */
    const getLikesFromPostId = async (postId) => {
        try{
            const response = await fetch(
                `http://localhost:3001/likes/${postId}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // console.log(response);
            const likes = await response.json();
            // console.log("Likes for post", postId, ":", likes);
            setLikes(likes);
        }
        catch(error){
            console.error("Error fetching likes:", error.message);
        }
    }
    const getIsLikedFromPostId = async (postId, userId) =>{
        // console.log("checking whether post is alr liked");
        try{
            const response = await fetch(
                `http://localhost:3001/likes/isLiked/${postId}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", },
                    body: JSON.stringify({userId})
                }
            );
            if (!response.ok) {
                throw new Error("Failed to check if liked");
            }
    
            const data = await response.json();
            // console.log(data.isLiked)
            setIsLiked(data.isLiked);

            // console.log("checked whether post is alr liked");

            // console.log("isliked"+data.isLiked)
        }
        catch(error){
            console.error("Error fetching likes:", response.status, response.statusText);
        }
    }

    const  getIsSavedFromUserId  = async (postId, userId) =>{
        // console.log("checking whether alr saved", postId, userId);
        try{
            const response = await fetch(
                `http://localhost:3001/savedPost/isSaved/${userId}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", },
                    body: JSON.stringify({postId})
                }
            );
            if (!response.ok) {
                throw new Error("Failed to check if liked");
            }
    
            const data = await response.json();
            setIsSaved(data.isSaved);
            // console.log("checked whether alr saved " , data.isSaved);
        }
        catch(error){
            console.error("Error fetching saves:", response.status, response.statusText);
        }
    }

    /* COMMENTS DATABASE FETCHING */
    const getCommentsFromPostId = async (postId) =>{
        try{
            // console.log("fetching comments");
            const response = await fetch(
                `http://localhost:3001/comments/${postId}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // console.log(response);
            const comments = await response.json();
            // console.log("Comments for post", postId, ":", comments);
            setComments(comments);

            //setting the comments in a print-able format
            //need picture and full name from user + the rest of the attributes that already exist
            // comments.forEach((comment,i)=>{
                
            //     commentBoxes.push({
            //         commentId: comment._id,
            //         comment_text: comment.comment_text,
            //         userId: comment.userId,
            //         postId: comment.postId,

            //     })
            // })
        }
        catch(error){
            console.error("Error fetching comments:", error.message);
        }
    }

    const getIsCommentsFromPostId = async(postId, userId) => {
        try{
            const response = await fetch(
                `http://localhost:3001/comments/isComments/${postId}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "application/json",
                    body: JSON.stringify({userId})
                }
            );
            if (!response.ok) {
                throw new Error("Failed to check if commented");
            }
    
            const data = await response.json();
            setIsComments(data.isComments);
        }
        catch(error){
            console.error("Error fetching comments:", response.status, response.statusText);
        }
    }

    const patchLike = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/posts/${postId}/like`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: loggedInUserId })
                }
            );
    
            if (response.ok) {
                const updatedLikes = await response.json();
                setLikes(updatedLikes);
                setIsLiked(!isLiked);
            } else {
                console.error('Failed to patch like:', response.statusText);
            }
        } catch (error) {
            console.error('Error patching like:', error.message);
        }
    };

    const handleComment = async () => {
        const requestBody = {
            comment_text: newComment,
            userId: userId,
            postId: postId
        };

        try {
            const response = await fetch(`http://localhost:3001/comments/addComment`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",  },
                body: JSON.stringify(requestBody)
                // body: formData
            });
            if (response.ok) {
                setAddComment(false);
                setIsComments(true);
                // setComments(...comments, newComment);
                getCommentsFromPostId(postId);
                setNewComment("");
            } else {
                console.error('Failed to add comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    }

    const handleSaved = async () => {
        // console.log("inside handlesave")
        const requestBody = {
            postId: postId
        };

        try {
            const savedData = await fetch(`http://localhost:3001/savedPost/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",  },
                body: JSON.stringify(requestBody)
    
            });
            // console.log('here')
            if (savedData.ok) {
                setIsSaved(!isSaved);
                // console.log(!isSaved);
             
            } else {
                // console.log("not saved")
                // console.log(requestBody);
                console.error('Failed to save:', savedData.statusText);
            }
        } catch (error) {
            console.error('Error saving:', error.message);
        }
    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#D6356A',
        },
        // '& .MuiRating-iconHover': {
        //   color: '#ff3d47',
        // },
      });


    useEffect(() => {
        getUserInfo(postUserId);
        getLikesFromPostId(postId);
        getIsLikedFromPostId(postId, userId);
        getCommentsFromPostId(postId);
        getIsCommentsFromPostId(postId, userId);
        getIsSavedFromUserId(postId, userId);
        // getPlaceFromPlaceId(postPlaceId);
        
        console.log("done with initial useEffect")
        // comments.forEach((comment)=>{getUserInfoForComments(comment)})
    }, []);

    useEffect(() => {
        if (comments.length > 0) {
            comments.forEach((comment) => {
                getUserInfoForComments(comment);  //for each comment, get user info and store the combined info in comment box state
            });
        }
    }, [comments]);

    // useEffect(())

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

    return(
        <WidgetWrapper m="2rem 0" customColor={"#ffd66f  "}>
            <PostHeader
                isPostHeader={true}
                postUserId={postUserId}
                userId={userId}
                postPlaceId={postPlaceId}
                name={name}
                userPicturePath={userPicturePath}
                friendIds={friendIds} 
                setFriendIds={setFriendIds}
             />
            <Typography color="#8a1f5a" sx={{ mt: '1rem' }}>
                {textContent}
            </Typography>
            {picturePaths && picturePaths.length && (
                <div style={{ marginTop: "0.75rem", height: "400px", width: "100%" }}>
                {picturePaths.length > 0 && (
                    <Carousel 
                        showThumbs={false} 
                        showStatus={false} 
                        useKeyboardArrows 
                        dynamicHeight={false}
                    >
                        {picturePaths.map((path, index) => (
                            <div key={index} style={{ position: "relative", height: "400px" }}>
                                <img
                                    src={`http://localhost:3001/assets/${path}`}
                                    alt={`post-${index}`}
                                    style={{ borderRadius: "0.75rem", width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>)}
            <FlexBetween>
                {priceLevel == -1 ? null : (
                    <FlexBetween>
                        <Typography>Price Level</Typography>
                        <Typography>{priceLevelDisplay}</Typography>
                    </FlexBetween>
                )}
                {rating == -1 ? null : (
                    <FlexBetween>
                        <Typography>Rating</Typography>
                        <StyledRating name="read-only"
                            value={rating}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            readOnly
                    />
                    </FlexBetween>
                )}
            </FlexBetween>

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: "#8a1f5a"}} />
                            ) : (
                                <FavoriteBorderOutlined sx={{ color: "#8a1f5a"}}/>
                            )}
                        </IconButton>
                        <Typography key={likes.length}>
                            {likes.length}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">

                        <IconButton onClick={() => {setIsComments(!isComments); setAddComment(!addComment)} }>
                            <ChatBubbleOutlineOutlined/>
                        </IconButton>
                        <Typography>
                            {comments.length}
                        </Typography>
                    </FlexBetween>

                    {/* for adding comments
                    <IconButton onClick={}>
                        <ChatBubbleOutlineOutlined/>
                    </IconButton> */}

                </FlexBetween>
                <IconButton onClick={handleSaved}>
                            {isSaved ? (
                                <BookmarkIcon sx={{ color: "#8a1f5a"}} />
                            ) : (
                                <BookmarkBorderIcon sx={{ color: "#8a1f5a"}} />
                            )}
                        </IconButton>
            </FlexBetween>
            {
                isComments && comments.length && (
                    <Box mt="0.5rem">
                        {
                            commentBoxes.map((commentBox, i) => (
                                <Box key={`${name}-${i}`}>
                                    <FlexBetween>
                                    <UserImage image={commentBox.commentPicturePath} size="55px" />
                                    {/* {commentBox.commentPicturePath && (
                                        <img
                                        width="100%"
                                        height="auto"
                                        alt='post'
                                        style={{borderRadius:"0.75rem", marginTop:"0.75rem"}}
                                        src={`http://localhost:3001/assets/${commentBox.commentPicturePath}`}
                                        />

                                    )} */}
                                    <Typography>{commentBox.commentFirstName + ' ' + commentBox.commentLastName}</Typography>
                                    <Divider/>
                                    <Typography sx={{
                                        color: "#8a1f5a",
                                        m: "0.5rem 0",
                                        pl: "1rem"
                                    }}>
                                        {commentBox.commentText}

                                    </Typography>
                                    </FlexBetween>
                                </Box>
                            )
                        )
                        }
                        <Divider></Divider>
                    </Box>
                )
            }
            {addComment && (
                <Box mt="0.5rem">
                    <FlexBetween>
                    <InputBase
                        placeholder="Your Comment..."
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                        sx={{
                        width: "100%",
                        backgroundColor: customColors.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        }}
                    />
                    <Button
                        // disabled={!post}
                        onClick={handleComment}
                        sx={{
                        color: customColors.background.alt,
                        backgroundColor: customColors.primary.main,
                        borderRadius: "3rem",
                        '&:hover': {
                            backgroundColor: "#ac2572",
                        },
                        }}
                    >ADD COMMENT</Button>
                    <Divider></Divider>
                    </FlexBetween>
                </Box>
            )}
        </WidgetWrapper>
    )
};

export default PostWidget;
