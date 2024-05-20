import express from "express";
import { getPlaces,getPlaceFromPlaceId, updatePlaceStats, getTop5PlacesForProvince, getTop5Places } from "../controllers/places.js";

const router = express.Router();

router.get("/", getPlaces);
router.get("/alltop5/", getTop5Places)
router.get("/:placeId", getPlaceFromPlaceId);
router.get("/top5province/:provinceName", getTop5PlacesForProvince);
// router.get("/alltop5", ()=>{console.log("reached")})

router.post("/updateStats/:placeId", updatePlaceStats)

export default router;