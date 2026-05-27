import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    domain: {
        type: String,
        required: true
    },
    pricingType: {
        type: String,
        enum: ["free", "paid"],
        default: "free"
    },
    price: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["draft", "pending", "approved", "rejected"],
        default: "draft"
    },
    rejectionReason: {
        type: String
    },
    recommendedForFailedCertifications: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);