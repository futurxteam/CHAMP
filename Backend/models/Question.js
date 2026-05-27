import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
    domain: String,
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    certification: { type: mongoose.Schema.Types.ObjectId, ref: "Certification", required: true },
});

export default mongoose.model("Question", questionSchema);