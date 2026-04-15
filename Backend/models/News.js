import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, default: "https://images.unsplash.com/photo-1504711432869-5d59f109ad5a?w=800&auto=format&fit=crop" },
    category: { type: String, default: "Industry" },
    source: { type: String, default: "Healthcare Global" },
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);
export default News;
