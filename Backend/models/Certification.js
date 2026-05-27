import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    domain: { type: String, required: true },
    description: String,
    price: Number,

    passingScore: { type: Number, default: 70 },


    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Certification", certificationSchema);