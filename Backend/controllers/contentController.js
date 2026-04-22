import Content from "../models/Content.js";

// POST /api/content/create (L2 / L3 only)
export const createContent = async (req, res) => {
  try {
    const { title, description, content, type, tags } = req.body;

    // Extract file paths from Cloudinary via Multer
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;
    const videoUrl = req.files?.video ? req.files.video[0].path : null;

    const newContent = await Content.create({
      title,
      description,
      thumbnail,
      videoUrl,
      content,
      type,
      tags: tags ? JSON.parse(tags) : [],
      user: req.user._id,   // was: speaker
      status: "pending",
      likes: [],
      saves: [],
    });

    res.status(201).json({
      message: "Content submitted for approval",
      content: newContent,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/content/published
export const getPublishedContent = async (req, res) => {
  try {
    const content = await Content.find({ status: "published" })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(content);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/content/my-content (contributor's own content)
export const getMyContent = async (req, res) => {
  try {
    const content = await Content.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(content);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/content/:id
export const updateContent = async (req, res) => {
  try {
    const { title, description, content, type } = req.body;
    const item = await Content.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Content not found" });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to edit this content" });
    }

    // Handle new files
    if (req.files?.thumbnail) item.thumbnail = req.files.thumbnail[0].path;
    if (req.files?.video) item.videoUrl = req.files.video[0].path;

    item.title = title || item.title;
    item.description = description || item.description;
    item.content = content || item.content;
    item.type = type || item.type;
    item.status = "pending"; // Reset for review

    await item.save();
    res.json({ message: "Content updated and sent for review", content: item });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/content/:id/like
export const toggleLikeContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    const userId = req.user._id.toString();
    const isLiked = content.likes.some(id => id.toString() === userId);

    if (isLiked) {
      content.likes = content.likes.filter(id => id.toString() !== userId);
    } else {
      content.likes.push(req.user._id);
    }

    await content.save();
    res.json({ likes: content.likes.length, isLiked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/content/:id/save
export const toggleSaveContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    const userId = req.user._id.toString();
    const isSaved = content.saves.some(id => id.toString() === userId);

    if (isSaved) {
      content.saves = content.saves.filter(id => id.toString() !== userId);
    } else {
      content.saves.push(req.user._id);
    }

    await content.save();
    res.json({ saved: !isSaved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/content/:id
export const getContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate("user", "name");
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/content/saved
export const getSavedContent = async (req, res) => {
  try {
    const userId = req.user._id;
    const content = await Content.find({
      saves: userId,
      status: "published",
    }).populate("user", "name");

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};