
import Post from "../models/Post.js";
import User from "../models/User.js";
import Like from "../models/Like.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, placeId, textContent, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      placeId,
      textContent,
      picturePaths: [picturePath],

      // userId,
      // firstName: user.firstName,
      // lastName: user.lastName,
      // location: user.location,
      // description,
      // userPicturePath: user.picturePath,
      // picturePath,
      // likes: {},
      // comments: [],
    });
    await newPost.save();

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
