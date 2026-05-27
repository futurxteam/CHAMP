import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },

    description: {
      type: String,
      required: true,
      minlength: 20,
    },

    thumbnail: String,
    videoUrl: String,

    content: {
      type: String, // JSON blocks for articles, or empty for video-only
    },

    type: {
      type: String,
      enum: ["article", "video"],
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    tags: [String],

    // Primary author reference — "user" kept for backward compat
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: String,

    // Admin who reviewed
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reviewedAt: Date,

    views: {
      type: Number,
      default: 0,
    },

    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],

    saves: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Content", ContentSchema);