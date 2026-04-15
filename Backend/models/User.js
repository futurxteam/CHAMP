import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "speaker", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      default: "Healthcare Professional & Digital Health Enthusiast",
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1559839734-2b71f1536780?w=200&h=200&fit=crop",
    },
    organization: {
      type: String,
      default: "Global Health Institute",
    },
    experience: {
      type: String,
      default: "8+ Years",
    },
    connections: {
      type: Number,
      default: 124,
    },
    interests: {
      type: [String],
      default: ["Digital Health", "Patient Care", "Medical Research"],
    },
    isMember: {
      type: Boolean,
      default: false,
    },
    membershipExpiry: {
      type: Date,
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
  },
  { timestamps: true }
);

// Method to match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
export default User;
