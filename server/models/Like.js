import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    userId: String,
    postId: String,
   
  },
);

const Like = mongoose.model("Like", likeSchema);

export default Like;