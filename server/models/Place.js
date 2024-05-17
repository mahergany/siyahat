import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    name: String,
    category: String,
    type: String,
    description: String,
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
    tags: Array,
    priceLevel: String,
    photos: Array,
  },
);

const Place = mongoose.model("Place", placeSchema);

export default Place;