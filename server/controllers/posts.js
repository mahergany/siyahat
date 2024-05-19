
import Post from "../models/Post.js";
import User from "../models/User.js";
import Like from "../models/Like.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    console.log("inside create post")
    const { userId, placeId, textContent, pictures } = req.body;
    console.log("Request Body:", req.body);
    // const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      placeId,
      textContent,
      picturePaths: JSON.parse(pictures),
    });
    await newPost.save();
    console.log("New Post Saved:", newPost);
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsFromPlaceId = async(req, res) => {
  console.log("inside getPostsFromPlaceId")
  try{
    const {placeId} = req.params;
    const post = await Post.find({placeId: placeId});
    res.status(200).json(post);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}


/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    //check if user has already liked
    const existingLike = await Like.findOne({ userId, postId: id });

    if (existingLike) {
      //remove like if exists
      await Like.findByIdAndDelete(existingLike._id);
    } else {
      //create new like
      const newLike = new Like({ userId: userId, postId: id });
      await newLike.save();
      // console.log('saved like')
    }
    const updatedLikes = await Like.find({postId: id});
    res.status(200).json(updatedLikes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
