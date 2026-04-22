import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["L1", "L2", "L3", "admin"],
      default: "L1",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "approved",
    },
    // Contributor fields
    expertise: {
      type: [String],
      default: [],
    },
    expertiseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
    },
    isContributor: {
      type: Boolean,
      default: false,
    },
    proofUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Password match
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Hash password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);