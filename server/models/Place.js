import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    name: String,
    category: String,
    type: String,
    description: String,
    latitude: Number,
    longitude: Number,
    postCount: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    placeRanking: Number,
    address: {
      street: String,
      city: String,
      province: String,
      country: String,
    },
    tags: Array,
    avgPriceLevel: { type: Number, default: 0 },
    totalPriceLevel: { type: Number, default: 0 },
    photos: Array,
  },
);

const Place = mongoose.model("Place", placeSchema);

export default Place;