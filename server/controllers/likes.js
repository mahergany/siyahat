import Post from "../models/Post.js";
import User from "../models/User.js";
import Like from "../models/Like.js";

export const getLikesFromPostId = async (req, res) => {
    try{
        const {postId} = req.params;
        const likes = await Like.find({postId});
        res.status(200).json(likes);
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const getIsLikedFromPostId = async(req,res) => {
    try{
        const {postId, userId} = req.params;
        const like = await Like.findOne({ postId, userId });
        if(like)
            res.status(200).json({isLiked: true});
        else
            res.status(200).json({isLiked: false});
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}