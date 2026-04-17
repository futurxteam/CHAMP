import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  content: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Content",
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },

  title: String,
  message: {
    type: String,
    required: true
  },

  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
}, { timestamps: true });

export default mongoose.model("Thread", ThreadSchema);