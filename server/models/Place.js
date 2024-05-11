import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    name: String,
    category: String,
    description: String,
    province: String,
    latitude: Number,
    longitude: Number,
    postCount: Number,
    avgPostCount: Number,
    placeRanking: Number,
    address: String,
   
  },
);

const Place = mongoose.model("Place", placeSchema);

export default Place;