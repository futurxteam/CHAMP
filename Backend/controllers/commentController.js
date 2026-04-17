import Comment from "../models/Comment.js";

// POST /api/comment
export const createComment = async (req, res) => {
  try {
    const { threadId, message, parentComment } = req.body;
    const comment = await Comment.create({
      thread: threadId,
      user: req.user._id,
      message,
      parentComment: parentComment || null,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/comment/:threadId
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ thread: req.params.threadId })
      .populate("user", "name")
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/comment/:id/like
export const toggleLikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const userId = req.user._id.toString();
    const isLiked = comment.likes.some(id => id.toString() === userId);

    if (isLiked) {
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      comment.likes.push(req.user._id);
    }

    await comment.save();
    res.json({ likes: comment.likes.length, isLiked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
