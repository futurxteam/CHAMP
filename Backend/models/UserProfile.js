import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    organization: String,
    experience: String,

    interests: [String],

    connections: {
      type: Number,
      default: 0,
    },

    savedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],

    savedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    // 🔥 Common stats
    stats: {
      posts: { type: Number, default: 0 },
      followers: { type: Number, default: 0 },
    },

    // 🔥 Contributor-specific fields
    contributorDetails: {
      topics: [String],
      sessions: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      verified: { type: Boolean, default: false },
    },

    // 🔥 Membership
    isMember: {
      type: Boolean,
      default: false,
    },

    membershipExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", UserProfileSchema);