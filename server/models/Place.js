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
    avgRating: Number,
    placeRanking: Number,
    address: {
      street: String,
      city: String,
      province: String,
      country: String,
    },
   
  },
);

const Place = mongoose.model("Place", placeSchema);

export default Place;