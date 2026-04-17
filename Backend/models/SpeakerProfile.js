import mongoose from "mongoose";

const SpeakerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    topics: {
      type: [String],
      required: true,
    },

    expertiseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      required: true,
    },

    sessions: {
      type: Number,
      default: 0,
    },

    totalAudience: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    availability: {
      type: String,
      enum: ["available", "busy", "not_available"],
      default: "available",
    },

    pricing: {
      perSession: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },

    socialLinks: {
      linkedin: String,
      twitter: String,
      website: String,
    },

    achievements: [
      {
        title: String,
        year: Number,
      },
    ],

    pastEvents: [
      {
        eventName: String,
        date: Date,
        audienceSize: Number,
      },
    ],
  },
  { timestamps: true }
);

// 🔥 Index
SpeakerProfileSchema.index({ user: 1 });

export default mongoose.model("SpeakerProfile", SpeakerProfileSchema);