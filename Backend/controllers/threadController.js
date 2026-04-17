import Thread from "../models/Thread.js";
import Comment from "../models/Comment.js";

// POST /api/thread
export const createThread = async (req, res) => {
  try {
    const { contentId, title, message } = req.body;
    const thread = await Thread.create({
      content: contentId,
      user: req.user._id,
      title,
      message,
    });
    res.status(201).json(thread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/thread/:contentId
export const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({ content: req.params.contentId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    // Attach comment counts
    const threadsWithCounts = await Promise.all(threads.map(async (t) => {
       const count = await Comment.countDocuments({ thread: t._id });
       return { ...t.toObject(), commentCount: count };
    }));

    res.json(threadsWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/thread/:id/like
export const toggleLikeThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    const userId = req.user._id.toString();
    const isLiked = thread.likes.some(id => id.toString() === userId);

    if (isLiked) {
      thread.likes = thread.likes.filter(id => id.toString() !== userId);
    } else {
      thread.likes.push(req.user._id);
    }

    await thread.save();
    res.json({ likes: thread.likes.length, isLiked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
