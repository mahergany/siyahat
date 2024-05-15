import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import PostWidget from "../widgets/PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // setPosts({posts: })
  console.log(posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    // console.log("line 12")
    try{
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response)
    const data = await response.json();
    // console.log(data);

    dispatch(setPosts({ posts: data }));
    }
    catch(error){
      console.log(error)
    }
  };

  const getUserPosts = async () => {
    // console.log("line 24")
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
    // dispatch(setPosts({ posts: data }));
  };

  // console.log(posts)
 useEffect(() => {
    if (isProfile) {
      // console.log('going to call getUserPosts')
      getUserPosts();
    } else {
      // console.log('going to call getPosts')
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* {posts.slice(0).reverse().map( 
        ({
          _id,
          postUserId,
          placeId,
          // firstName,
          // lastName,
          // description,
          textContent,
          // location,
          picturePath,
          // userPicturePath,
          // likes,
          // comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            // postUserId={postUserId}
            postUserId={postUserId}
            userId={userId}
            postPlaceId={placeId}
            // name={`${firstName} ${lastName}`}
            textContent={textContent}
            // location={location}
            picturePath={picturePath}
            // userPicturePath={userPicturePath}
            // likes={likes}
            // comments={comments}
          />
        )
      )} */}
      {/* {
        posts.slice(0).reverse.forEach((post, index) =>{
          return(
            <PostWidget
              key={post._id}
              postId={post._id}
              postUserId={post.userId} //the userId of the post
              userId={userId} //the userId of the one accessing
              postPlaceId={post.placeId}
              textContent={post.textContent}
              picturePath={post.picturePath}
            />
          )
        })
      } */}
      {posts.slice(0).reverse().map(post => (
      <PostWidget
        key={post._id}
        postId={post._id}
        postUserId={post.userId} //the userId of the post
        userId={userId} //the userId of the one accessing
        postPlaceId={post.placeId}
        textContent={post.textContent}
        picturePath={post.picturePath}
      />
    ))}
    </>
  );
};

export default PostsWidget;