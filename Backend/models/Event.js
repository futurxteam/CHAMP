import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, default: "10:00 AM" },
    description: { type: String, required: true },
    location: { type: String, required: true },
    thumbnail: { type: String },
    maxOccupants: { type: Number, default: 50 },
    registrationTimeline: { type: Date, required: true },
    registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { 
       type: String, 
       enum: ["pending", "published"],
       default: "published"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
