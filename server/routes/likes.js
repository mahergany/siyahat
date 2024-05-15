import express from "express";
import { getLikesFromPostId,getIsLikedFromPostId } from "../controllers/likes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/:postId', verifyToken,getLikesFromPostId)
router.get('/isLiked/:postId', verifyToken,getIsLikedFromPostId)

export default router;