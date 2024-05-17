import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js"
import { verifyToken } from "./middleware/auth.js";
import {createPost} from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Place from "./models/Place.js";
import Comment from "./models/Comment.js";
import Like from "./models/Like.js";
// import { users, posts, places, comments, likes } from "./data/index.js";
import { users, posts, places, comments, likes } from "./data/newData.js";


import attractionsRoutes from './routes/attractions.js'; // Import attractions route
import fs from "fs";
import savePlacesRoutes from "./routes/savePlacesRoutes.js";
import SavedPost from "./models/SavedPost.js";
import { savedPosts } from "./data/newData.js";
import savedPostRoutes from './routes/savedPost.js'


import { readFile } from 'fs/promises';
import csv from 'csvtojson';



/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

  /*ROUTES WITH FILES*/
  app.post("/auth/register", upload.single("picture"), register);
  app.post("/posts", verifyToken, upload.single("picture"), createPost);
  
  /* ROUTES */

  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);
  app.use('/attractions', attractionsRoutes);
  app.use("/api/save-places", savePlacesRoutes); //for saving restaurants from api

  app.use("/likes", likesRoutes);
  app.use("/comments", commentsRoutes);
  app.use('/savedPost', savedPostRoutes)
 


  /* DATABASE FETCHING/SETTING WITHOUT STRUCTURE */
  // app.get("/likes", (req, res) => {

  // })
 


  /*MONGOOSE SETUP*/
  const PORT = process.env.port || 6001;
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));

    /*ADD DATA ONE TIME*/
    // User.insertMany(users);
    // Post.insertMany(posts);
    // Place.insertMany(places);
    // Comment.insertMany(comments);
    // Like.insertMany(likes);

    /* ADDING UPDATED POSTS, COMMENTS, LIKES */
    // Post.insertMany(posts);
    // Comment.insertMany(comments);
    // Like.insertMany(likes);
    // Place.insertMany(places);
    
    /* ADDING SAVED POSTS */
    // SavedPost.insertMany(savedPosts);


  }).catch((error) => console.log(`${error} did not connect`));
 

  