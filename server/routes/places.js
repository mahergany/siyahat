import express from "express";
import { getPlaces,getPlaceFromPlaceId } from "../controllers/places.js";

const router = express.Router();

router.get("/", getPlaces);
router.get("/:placeId", getPlaceFromPlaceId);

export default router;