import User from "../models/User.js";
import Post from "../models/Post.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({_id: id});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// export const getUserInfoFromPostId = async (req,res) => {
//   try{
//     const {postId} = req.params;
//     const post = await Post.findOne({postId});
//     const user = await User.findOne({_id: post.userId})
//     res.status(200).json(user);
// }
// catch(error){
//     return res.status(400).json({ error: error.message });
// }
// }

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const editUserOccupation = async (req, res) => {
  const { userId } = req.params;
  const {newOccupation} = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.occupation = newOccupation;

    await user.save();

    res.status(200).json({ message: "Occupation changed" });

  } catch (error) {
    console.error("Error setting occupation:", error.message);
    res.status(404).json({ message: error.message });
  }
};


export const editUserLocation = async (req, res) => {
  const { userId } = req.params;
  const {newLocation} = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.location = newLocation;

    await user.save();

    res.status(200).json({ message: "Location changed" });

  } catch (error) {
    console.error("Error setting location:", error.message);
    res.status(404).json({ message: error.message });
  }
};

