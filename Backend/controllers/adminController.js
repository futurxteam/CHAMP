import User from "../models/User.js";
import Content from "../models/Content.js";

// GET /api/admin/contributors/pending
// Returns L2 contributors still awaiting approval
export const getPendingContributors = async (req, res) => {
  try {
    const contributors = await User.find({
      isContributor: true,
      status: "pending",
    }).select("-password");

    res.json(contributors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/contributors/:id/approve
export const approveContributor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.isContributor) {
      return res.status(404).json({ message: "Contributor not found" });
    }

    user.status = "approved";
    await user.save();

    res.json({ message: "Contributor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/contributors/:id/reject
export const rejectContributor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.isContributor) {
      return res.status(404).json({ message: "Contributor not found" });
    }

    user.status = "rejected";
    await user.save();

    res.json({ message: "Contributor rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/contributors/:id/promote
// Promote L2 → L3
export const promoteContributor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "L2") {
      return res.status(400).json({ message: "Only L2 contributors can be promoted to L3" });
    }

    user.role = "L3";
    await user.save();

    res.json({ message: "User promoted to L3 successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/users  — Paginated & Filterable
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { name, role } = req.query;

    const query = { role: { $ne: "admin" } };
    if (name) query.name = { $regex: name, $options: "i" };
    if (role) query.role = role;

    const total = await User.countDocuments(query);
    const users = await User.find(query)
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

// PUT /api/admin/users/:id/status
export const updateUserStatus = async (req, res) => {
  try {
    const { status, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (status) user.status = status;
    if (role) user.role = role;
    await user.save();

    res.json({ message: `User updated successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/content/pending
export const getPendingContent = async (req, res) => {
  try {
    const content = await Content.find({ status: "pending" })
      .populate("user", "name email");

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
// DELETE /api/admin/content/:id
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
