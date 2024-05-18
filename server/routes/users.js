import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriend,
    getIsFriend,
    setFriend
    // getUserInfoFromPostId
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/:id", verifyToken, getUser);
router.get("/friends/:userId", verifyToken, getUserFriends);
// router.get("/info/:id", verifyToken, getUserInfoFromPostId)

/*UPDATE*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* POST */
router.post("/isFriend/:userId", verifyToken, getIsFriend)
router.post("/friend/:userId", verifyToken, setFriend)

export default router;