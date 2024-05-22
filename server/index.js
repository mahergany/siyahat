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
import placesRoutes from "./routes/places.js";
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
// import placesJsonData from "../places.json" with { type: "json" };
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

// /* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });
//   const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { files: 10 }, //limit of how many get uploaded at once
});

//   /*ROUTES WITH FILES*/
  app.post("/auth/register", upload.single("picture"), register);
  // app.post("/posts", verifyToken, upload.single("picture"), createPost);
  app.post("/posts", verifyToken, upload.any("picture"), createPost);

 


  /* ROUTES */

  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);
  app.use('/attractions', attractionsRoutes);
  app.use("/api/save-places", savePlacesRoutes); //for saving restaurants from api

  app.use("/likes", likesRoutes);
  app.use("/comments", commentsRoutes);
  app.use("/places", placesRoutes);
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


    /* ADDING ALL PLACES */
    // placesJsonData.forEach(async (place) => {
    //   try{
    //     // if(place.category == "attraction")
    //     //   console.log("attraction")
    //     if(place.address.country == "Pakistan" || place.category == "attraction"){
    //       const newPlace = new Place(place);
    //       await newPlace.save();
    //       console.log(`Inserted ${place.name} into MongoDB`);
    //     }
    //   }
    //   catch(error){
    //     console.log(`Error inserting ${place.name}: ${err}`)
    //   }
      
    // });

    /*  TO CHECK ON PLACES */
    // (async () => {
    //   try {
    //     const count = await Place.countDocuments();
    //     console.log("Amount of Places:", count);
    //   } catch (error) {
    //     console.error("Error finding documents:", error);
    //   }
    // })();

    async function updatePlacesWithProvince() {
      try {
 
        const csvFilePath = path.join(__dirname, '../pk.csv'); // Update the path to your CSV file
        const jsonArray = await csv().fromFile(csvFilePath);

        // Create a mapping of city to province
        const cityToProvince = jsonArray.reduce((acc, cityData) => {
          acc[cityData.city] = cityData.admin_name;
          return acc;
        }, {});

        // Fetch all places that need the province field set
        const placesToUpdate = await Place.find({
          $or: [
            { 'address.province': { $exists: false } },
            { 'address.province': null }
          ],
          'category': 'Restaurant'
        });

        // Update each place with the correct province corresponding to the city in the CSV
        for (const place of placesToUpdate) {
          if (place.address && place.address.city) {
            const province = cityToProvince[place.address.city];
            if (province) {
              place.address.province = province;
              await place.save();
              console.log(`Updated ${place.name} with province ${province}`);
            } else {
              console.log(`Province not found for ${place.name}`);
            }
          } else {
            console.log(`Invalid address for ${place.name}`);
          }
        }
      } catch (error) {
        console.error('Error updating places with province:', error);
      }
    }

      // updatePlacesWithProvince();


  }).catch((error) => console.log(`${error} did not connect`));
 

  