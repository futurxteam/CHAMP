import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, default: "10:00 AM" },
    description: { type: String, required: true },
    fullDetails: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, default: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop" },
    category: { type: String, default: "Conference" },
    speakers: { type: [String], default: [] },
    attendees: { type: Number, default: 100 },
    price: { type: String, default: "Free" },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
