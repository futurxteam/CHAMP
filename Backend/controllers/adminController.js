import User from "../models/User.js";
import Content from "../models/Content.js";
import Certification from "../models/Certification.js";
import Question from "../models/Question.js";
import MEDICAL_DOMAINS from "../models/domains.js";

// ─── GET /api/admin/contributors/pending ─────────────────────────────────────
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

// ─── PUT /api/admin/contributors/:id/approve ─────────────────────────────────
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

// ─── PUT /api/admin/contributors/:id/reject ──────────────────────────────────
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

// ─── PUT /api/admin/contributors/:id/promote (L2 → L3) ──────────────────────
export const promoteContributor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
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

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
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

    res.json({ users, total, pages: Math.ceil(total / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/admin/users/:id/status ─────────────────────────────────────────
export const updateUserStatus = async (req, res) => {
  try {
    const { status, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (status) user.status = status;
    if (role) user.role = role;
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/admin/content/pending ──────────────────────────────────────────
export const getPendingContent = async (req, res) => {
  try {
    const content = await Content.find({ status: "pending" })
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/admin/content/all ───────────────────────────────────────────────
export const getAllContent = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const content = await Content.find(query)
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/admin/content/:id/approve ──────────────────────────────────────
export const approveContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    if (!Array.isArray(content.likes)) content.likes = [];
    if (!Array.isArray(content.saves)) content.saves = [];

    content.status = "approved";
    content.reviewedBy = req.user._id;
    content.reviewedAt = new Date();
    content.rejectionReason = undefined;

    await content.save();
    res.json({ message: "Content approved and published successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/admin/content/:id/reject ───────────────────────────────────────
export const rejectContent = async (req, res) => {
  try {
    const { reason } = req.body;
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    if (!Array.isArray(content.likes)) content.likes = [];
    if (!Array.isArray(content.saves)) content.saves = [];

    content.status = "rejected";
    content.rejectionReason = reason || "Content did not meet platform standards.";
    content.reviewedBy = req.user._id;
    content.reviewedAt = new Date();

    await content.save();
    res.json({ message: "Content rejected with feedback" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE /api/admin/content/:id ───────────────────────────────────────────
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCertification = async (req, res) => {
  try {
    const { title, domain, description, price, passingScore } = req.body;

    if (!domain || !MEDICAL_DOMAINS.includes(domain)) {
      return res.status(400).json({
        message: `Invalid domain. Must be one of: ${MEDICAL_DOMAINS.join(", ")}`,
      });
    }

    const cert = await Certification.create({
      title,
      domain,
      description,
      price,
      passingScore,
      createdBy: req.user._id,
    });

    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { certId } = req.params;
    const { question, options, correctAnswer, domain, difficulty } = req.body;

    const cert = await Certification.findById(certId);
    if (!cert) return res.status(404).json({ message: "Certification not found" });

    // Validation
    if (!question || !options || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({ message: "Invalid question data. 4 options and correct answer required." });
    }
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: "Correct answer must be one of the options" });
    }

    const q = await Question.create({
      question,
      options,
      correctAnswer,
      domain: domain || cert.domain,
      difficulty,
      certification: certId,
    });

    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionsByCert = async (req, res) => {
  try {
    const { certId } = req.params;
    const questions = await Question.find({ certification: certId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};