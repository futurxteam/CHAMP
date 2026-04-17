import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  thread: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Thread",
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },

  message: {
    type: String,
    required: true
  },

  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // Supports nested subthreads
  },

  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);