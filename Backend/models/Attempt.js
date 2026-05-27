import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    certification: { type: mongoose.Schema.Types.ObjectId, ref: "Certification" },
    answers: [
        {
            questionId: mongoose.Schema.Types.ObjectId,
            selected: String,
        },
    ],
    score: Number,
    passed: Boolean,
    attemptedAt: { type: Date, default: Date.now }, 
});

export default mongoose.model("Attempt", attemptSchema);