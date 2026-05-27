import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Module", ModuleSchema);