import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getSavedPostsFromUserId, savePost } from "../controllers/savedPost.js";

const router = express.Router();

/* READ */
router.get("/:userId/", verifyToken, getSavedPostsFromUserId);

/* UPDATE */
router.post("/:userId",verifyToken,savePost );

export default router;