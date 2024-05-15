import mongoose from "mongoose";

// const postSchema = mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     location: String,
//     description: String,
//     picturePath: String,
//     userPicturePath: String,
//     likes: {
//       type: Map,
//       of: Boolean,
//     },
//     comments: {
//       type: Array,
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

const postSchema = mongoose.Schema(
  {
    userId: String,

    /* CAN FETCH THE BELOW FROM THE USERID */

    // firstName: {
    //   type: String,
    //   required: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    // },

    /* PLACEID GOES HERE */
    placeId: String,

    textContent: String,

    /* CHANGE THIS LOGIC LATER MAYBE */
    picturePaths:{
      type: Array,
      default: []
    },

    /* GET THIS FROM THE USERID ASW */

    // userPicturePath: String,

    /* GET LIKES AND COMMENTS FROM THEIR RESPECTIVE TABLES */

    // likes: {
    //   type: Map,
    //   of: Boolean,
    // },
    // comments: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;