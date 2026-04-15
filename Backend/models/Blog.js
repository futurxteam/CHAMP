import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String, 
      required: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    },
    category: {
      type: String,
      default: "General",
    },
    author: {
      type: String,
      default: "Dr. CHAMP",
    },
    authorAvatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1559839734-2b71f1536780?w=100&h=100&fit=crop",
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: String,
        avatar: String,
        text: String,
        date: { type: Date, default: Date.now },
      }
    ],
    isPremium: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
