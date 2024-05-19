import express from "express";
import { getPlaces,getPlaceFromPlaceId, updatePlaceStats } from "../controllers/places.js";

const router = express.Router();

router.get("/", getPlaces);
router.get("/:placeId", getPlaceFromPlaceId);

router.post("/updateStats/:placeId", updatePlaceStats)

export default router;