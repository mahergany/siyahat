import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriend,
    // getUserInfoFromPostId
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/:id", verifyToken, getUser);
router.get(":/id/friends", verifyToken, getUserFriends);
// router.get("/info/:id", verifyToken, getUserInfoFromPostId)

/*UPDATE*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;