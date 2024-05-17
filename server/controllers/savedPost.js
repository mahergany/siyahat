import SavedPost from "../models/SavedPost.js";

export const savePost = async (req, res) => {
    const {userId } = req.params;
    const {postId }= req.body;
    console.log(userId,postId);

    const existingSavedPost = await SavedPost.findOne({ userId:userId, postId: postId });
    



    try {
        if (existingSavedPost) {

                await SavedPost.findByIdAndDelete(existingSavedPost._id);
              } else {
        const newSavedPost = new SavedPost({
            userId: userId,
            postId: postId,
        });
        console.log(newSavedPost)
        await newSavedPost.save();
        res.status(201).json({ message: 'Post saved successfully' });
    }} catch (error) {
        res.status(500).json({ message: 'Failed to save post', error: error.message });
    }
}


export const getSavedPostsFromUserId = async (req, res) => {
    try{
        const {userId} = req.params;
        const savedPosts = await SavedPost.find({userId: userId});
        res.status(200).json(savedPosts);
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}

export const getIsSavedFromUserId = async (req,res) =>{
    try{
        const {postId} = req.params;
        const {userId} = req.body;
        const saved = await SavedPost.findOne({ postId:postId, userId:userId });
        if(saved)
            res.status(200).json({isSaved: true});
        else
            res.status(200).json({isSaved: false});
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}