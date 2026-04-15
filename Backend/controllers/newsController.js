import News from "../models/News.js";

// @desc    Get all news
// @route   GET /api/news
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get news by ID
// @route   GET /api/news/:id
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ message: "News not found" });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid News ID format" });
    }
    res.status(500).json({ message: error.message });
  }
};

export { getNews, getNewsById };
