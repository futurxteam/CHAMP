import User from "../models/User.js";
import SpeakerProfile from "../models/SpeakerProfile.js";
import Content from "../models/Content.js";

export const getPendingSpeakers = async (req, res) => {
  try {
    const speakers = await User.find({
      role: "speaker",
      status: "pending",
    })
      .populate("speakerProfile") // 🔥 include speaker details
      .select("-password");

    res.json(speakers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const approveSpeaker = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "speaker") {
      return res.status(404).json({ message: "Speaker not found" });
    }

    // 🔥 Check profile completeness
    const profile = await SpeakerProfile.findOne({ user: user._id });

    if (!profile || !profile.profileCompleted) {
      return res.status(400).json({
        message: "Speaker profile is incomplete",
      });
    }

    // ✅ Approve
    user.status = "approved";
    await user.save();

    // ✅ Verify speaker
    profile.verified = true;
    await profile.save();

    res.json({ message: "Speaker approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const rejectSpeaker = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "speaker") {
      return res.status(404).json({ message: "Speaker not found" });
    }

    user.status = "rejected";
    await user.save();

    res.json({ message: "Speaker rejected" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Manage All Users (Paginated & Filterable)
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { name, role } = req.query;

    const query = { role: { $ne: "admin" } }; // 🔥 Exclude admins from the list
    if (name) query.name = { $regex: name, $options: "i" };
    if (role) query.role = role;

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .populate("speakerProfile") // 🔥 Include speaker details
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔥 Change User Status (Approve/Block/Pending)
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = status;
    await user.save();

    res.json({ message: `User status updated to ${status}` });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/content/pending

export const getPendingContent = async (req, res) => {
  try {
    const content = await Content.find({ status: "pending" })
      .populate("speaker", "name email");

    res.json(content);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/content/:id/approve

export const approveContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Fix legacy Number values to Arrays if necessary
    if (!Array.isArray(content.likes)) content.likes = [];
    if (!Array.isArray(content.saves)) content.saves = [];

    content.status = "published";
    content.approvedBy = req.user._id;

    await content.save();

    res.json({ message: "Content approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/content/:id/reject

export const rejectContent = async (req, res) => {
  try {
    const { reason } = req.body;

    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Fix legacy Number values to Arrays if necessary
    if (!Array.isArray(content.likes)) content.likes = [];
    if (!Array.isArray(content.saves)) content.saves = [];

    content.status = "rejected";
    content.rejectionReason = reason;

    await content.save();

    res.json({ message: "Content rejected" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};