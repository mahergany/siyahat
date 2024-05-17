import mongoose from "mongoose";

const SavedPostSchema = mongoose.Schema(
  {
    userId: String,
    postId: String,
  },
  {timestamps: true}
);

const SavedPost = mongoose.model("SavedPost", SavedPostSchema);

export default SavedPost;