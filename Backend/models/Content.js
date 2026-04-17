import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,
    thumbnail: String,
    videoUrl: String,

    content: {
      type: String, // markdown / HTML / video URL
      required: true,
    },

    type: {
      type: String,
      enum: ["article", "video", "course"],
      default: "article",
    },

    tags: [String],

    speaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "published", "rejected"],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rejectionReason: String,

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