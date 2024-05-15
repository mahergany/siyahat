import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getCommentsFromPostId, getIsCommentsFromPostId , postNewComment} from "../controllers/comments.js";

const router = express.Router();

router.get('/:postId', verifyToken,getCommentsFromPostId);
router.get('/isComments/:postId', verifyToken,getIsCommentsFromPostId);
router.post('/addComment', postNewComment)

export default router;