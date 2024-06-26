import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  mode: "light",
  user: null,
  token: null,
  posts: [],
  savedPosts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setMap: (state) => {
    //   state.map = 
    // },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setSavedPosts: (state, action) => {
      state.savedPosts = action.payload.savedPosts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setSavedPosts } =
  authSlice.actions;
export default authSlice.reducer;