import Content from "../models/Content.js";
import MEDICAL_DOMAINS from "../models/domains.js";

// ─── POST /api/content/create (L2 / L3 only) ────────────────────────────────
export const createContent = async (req, res) => {
  try {
    const { title, description, content, type, domain, tags, videoUrl: bodyVideoUrl } = req.body;

    // Validation
    if (!title || title.length < 5) {
      return res.status(400).json({ message: "Title must be at least 5 characters" });
    }
    if (!description || description.length < 20) {
      return res.status(400).json({ message: "Description must be at least 20 characters" });
    }
    if (!type || !["article", "video"].includes(type)) {
      return res.status(400).json({ message: "Type must be 'article' or 'video'" });
    }
    if (!domain) {
      return res.status(400).json({ message: "Domain is required" });
    }
    if (!MEDICAL_DOMAINS.includes(domain)) {
      return res.status(400).json({ message: `Invalid domain. Must be one of: ${MEDICAL_DOMAINS.join(", ")}` });
    }

    
    // Must have either article content or a video URL
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;
    const uploadedVideoUrl = req.files?.video ? req.files.video[0].path : null;
    const finalVideoUrl = uploadedVideoUrl || bodyVideoUrl || null;

    if (type === "article" && !content) {
      return res.status(400).json({ message: "Article content is required" });
    }
    if (type === "video" && !finalVideoUrl) {
      return res.status(400).json({ message: "Video URL or file is required for video content" });
    }

    // Parse tags — accept comma string OR JSON array
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch {
        parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    const newContent = await Content.create({
      title,
      description,
      thumbnail,
      videoUrl: finalVideoUrl,
      content: content || "",
      type,
      domain,
      tags: parsedTags,
      user: req.user._id,
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

// ─── GET /api/content/published ─────────────────────────────────────────────
export const getPublishedContent = async (req, res) => {
  try {
    const { domain, type, search } = req.query;

    const query = { status: "approved" };
    if (domain) query.domain = domain;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const content = await Content.find(query)
      .populate("user", "name role")
      .sort({ createdAt: -1 });

    res.json(content);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/content/my-content (contributor's own content) ─────────────────
export const getMyContent = async (req, res) => {
  try {
    const content = await Content.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(content);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/content/:id ─────────────────────────────────────────────────────
export const updateContent = async (req, res) => {
  try {
    const { title, description, content, type, domain, tags, videoUrl: bodyVideoUrl } = req.body;
    const item = await Content.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Content not found" });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this content" });
    }

    // Handle new files
    if (req.files?.thumbnail) item.thumbnail = req.files.thumbnail[0].path;
    if (req.files?.video) item.videoUrl = req.files.video[0].path;
    if (bodyVideoUrl) item.videoUrl = bodyVideoUrl;

    if (title) item.title = title;
    if (description) item.description = description;
    if (content) item.content = content;
    if (type) item.type = type;
    if (domain) item.domain = domain;

    if (tags) {
      try {
        item.tags = JSON.parse(tags);
      } catch {
        item.tags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    item.status = "pending"; // Reset for re-review
    item.rejectionReason = undefined;

    await item.save();
    res.json({ message: "Content updated and re-submitted for review", content: item });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/content/:id/like ───────────────────────────────────────────────
export const toggleLikeContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    const userId = req.user._id.toString();
    const isLiked = content.likes.some((id) => id.toString() === userId);

    if (isLiked) {
      content.likes = content.likes.filter((id) => id.toString() !== userId);
    } else {
      content.likes.push(req.user._id);
    }

    await content.save();
    res.json({ likes: content.likes.length, isLiked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/content/:id/save ───────────────────────────────────────────────
export const toggleSaveContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    const userId = req.user._id.toString();
    const isSaved = content.saves.some((id) => id.toString() === userId);

    if (isSaved) {
      content.saves = content.saves.filter((id) => id.toString() !== userId);
    } else {
      content.saves.push(req.user._id);
    }

    await content.save();
    res.json({ saved: !isSaved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/content/:id ─────────────────────────────────────────────────────
export const getContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate("user", "name role");
    if (!content) return res.status(404).json({ message: "Content not found" });

    // Increment view count
    content.views += 1;
    await content.save();

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/content/saved ───────────────────────────────────────────────────
export const getSavedContent = async (req, res) => {
  try {
    const userId = req.user._id;
    const content = await Content.find({
      saves: userId,
      status: "approved",
    }).populate("user", "name role");

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};