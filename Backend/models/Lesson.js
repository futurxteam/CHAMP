import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    },
    notes: {
        type: String
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Lesson", LessonSchema);