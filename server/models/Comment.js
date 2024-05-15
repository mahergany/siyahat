import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment_text: String,
    userId: String,
    postId: String,
  },
  {timestamps: true}
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;