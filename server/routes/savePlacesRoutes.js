// savePlacesRoutes.js

import express from "express";
import { savePlaces } from "../controllers/savePlacesController.js";

const router = express.Router();

router.post("/", savePlaces);

export default router;