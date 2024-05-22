import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriend,

    editUserLocation,
    editUserOccupation,

    getIsFriend,
    setFriend,
    getUsers
    // getUserInfoFromPostId
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/:id", verifyToken, getUser);
router.get("/",getUsers);
router.get(":/id/friends", verifyToken, getUserFriends);
router.post("/:userId/location", editUserLocation);
// router.post(":userId/occupation", editUserOccupation);
router.post("/:userId/occupation", editUserOccupation);


router.get("/friends/:userId", verifyToken, getUserFriends);
// router.get("/info/:id", verifyToken, getUserInfoFromPostId)

/*UPDATE*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* POST */
router.post("/isFriend/:userId", verifyToken, getIsFriend)
router.post("/friend/:userId", verifyToken, setFriend)

export default router;