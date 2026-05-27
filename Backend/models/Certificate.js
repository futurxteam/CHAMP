import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    certification: { type: mongoose.Schema.Types.ObjectId, ref: "Certification", required: true },
    verificationId: { type: String, unique: true, required: true },
    certificateUrl: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
});

// Ensure a user only has ONE certificate per certification
certificateSchema.index({ user: 1, certification: 1 }, { unique: true });

export default mongoose.model("Certificate", certificateSchema);