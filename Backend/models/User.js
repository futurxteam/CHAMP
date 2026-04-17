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
    speakerProfile: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "SpeakerProfile",
},
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "speaker", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "approved",
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