import User from "../models/UserModel.js";
import Post from "../models/postModel.js";
//CREATE POST
const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ error: "Postedby and text fields are required" });
    }
    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text must be less than ${maxLength} characters` });
    }

    const newPost = new Post({ postedBy, text });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

//get post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not Found" });

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not Found" });

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to delete post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post Deleted succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//LIKE AND UNLIKE
const likeUnlikePost = async (req, res) => {
  try {
    //renaming id to postId;
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // Unlike post
      //inside the likes array just remove the userId
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // Like post
      //here we're pushing the userId into likes array;
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//REPLY
const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    if (!text)
      return res.status(400).json({ message: "Text field is required" });

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newReply = {
      text,
      userId,
      userProfilePic,
      username,
    };
    post.replies.push(newReply);
    await post.save();
    res.status(200).json({ message: "Reply posted successfully", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//TO SEE THE FEED
const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
   
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const following = user.following;
    
    //here we're finding the post if it's  in the following array like people we're following and there posts
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      //sorting in dsc order
      createdAt: -1,
    });
 

    res.status(200).json({feedPosts});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
};