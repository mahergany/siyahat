
import Comment from "../models/Comment.js"

export const getCommentsFromPostId = async (req, res) => {
    try{
        const {postId} = req.params;
        const comments = await Comment.find({postId});
        res.status(200).json(comments);
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const getIsCommentsFromPostId = async (req, res) =>{
    try{
        const {postId, userId} = req.params;
        const comment = await Comment.findOne({ postId, userId });
        if(comment)
            res.status(200).json({isComments: true});
        else
            res.status(200).json({isCommments: false});
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const postNewComment = async (req,res) =>{
    const { comment_text, userId, postId } = req.body;
    console.log("adding comment")
    console.log(comment_text, userId, postId);
  try {
    const newComment = new Comment({
      comment_text,
      userId,
      postId,
    });
    await newComment.save();
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment', error: error.message });
  }
}