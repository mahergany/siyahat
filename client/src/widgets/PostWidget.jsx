import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';
import { Box, Typography, IconButton, Divider , Button, InputBase} from '@mui/material';
import FlexBetween from '../components/FlexBetween';
import Friend from '../components/Friend';
import WidgetWrapper from '../components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../state';
import { useEffect } from 'react';
import UserImage from "../components/UserImage";

const PostWidget = ({
   
           postId,
            postUserId, // the user id of the post being displayed
            userId, //the user id of the person viewing
            postPlaceId,
            // name,
            textContent,
            // location,
            picturePath,
            // userPicturePath,
            // likes,
            // comments,

}) => {
    // console.log(postUserId);
    const [likes, setLikes] = useState([]);
    const [isComments, setIsComments] = useState(false);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const [isLiked, setIsLiked] = useState(false); 
    const [user, setUser] = useState();

    const [name, setName] = useState("");
    const [userPicturePath, setUserPicturePath ] = useState("");
    const [addComment, setAddComment] = useState(false);
    const [newComment, setNewComment ] = useState("");
    const [commentBoxes, setCommentBoxes] = useState([]);

    const getUserInfoForComments = async (comment) =>{
        console.log("inside ", comment.userId);
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
            console.log(newCommentBox.commentFirstName)
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
    useEffect(() => {
        console.log("Updated commentBoxes:", commentBoxes);
    }, [commentBoxes]);
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
            setIsLiked(data.isLiked);
        }
        catch(error){
            console.error("Error fetching likes:", response.status, response.statusText);
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
            console.log("Comments for post", postId, ":", comments);
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
                `http://localhost:3001/comment/isComments/${postId}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "application/json",
                    body: JSON.stringify({userId})
                }
            );
            if (!response.ok) {
                throw new Error("Failed to check if liked");
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

    useEffect(() => {
        getUserInfo(postUserId);
        getLikesFromPostId(postId);
        getIsLikedFromPostId(postId, userId);
        getCommentsFromPostId(postId);
        getIsCommentsFromPostId(postId, userId);
        console.log("here")
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
        <WidgetWrapper m="2rem 0">
            <Friend 
             friendId={postUserId}
                name={name}
                subtitle={postPlaceId}
                userPicturePath={userPicturePath}
             />
            <Typography color="#8a1f5a" sx={{ mt: '1rem' }}>
                {textContent}
            </Typography>
            {picturePath && (
                <img
                width="100%"
                height="auto"
                alt='post'
                style={{borderRadius:"0.75rem", marginTop:"0.75rem"}}
                src={`http://localhost:3001/assets/${picturePath}`}
                />

            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: "#8a1f5a"}} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography key={likes.length}>
                            {likes.length}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">

                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined/>
                        </IconButton>
                        <Typography>
                            {comments.length}
                        </Typography>
                    </FlexBetween>

                    {/* for adding comments */}
                    <IconButton onClick={()=> setAddComment(!addComment)}>
                        <ChatBubbleOutlineOutlined/>
                    </IconButton>

                </FlexBetween>
                <IconButton>
                    <ShareOutlined></ShareOutlined>
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
