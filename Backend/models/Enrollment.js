import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    enrollmentType: {
        type: String,
        enum: ["free", "paid"],
        required: true
    }
}, { timestamps: true });

// Prevent duplicate enrollments by enforcing compound unique index
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model("Enrollment", EnrollmentSchema);
