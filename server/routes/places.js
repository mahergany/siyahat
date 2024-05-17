import express from "express";
import { getPlaces } from "../controllers/places.js";

const router = express.Router();

router.get("/", getPlaces);

export default router;