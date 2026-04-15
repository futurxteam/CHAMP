import Blog from "../models/Blog.js";

// @desc    Get all blogs (with partial visibility)
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    const result = blogs.map((blog) => {
      // Always ensure comments exists for the frontend
      const baseInfo = {
        _id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt,
        isPremium: blog.isPremium,
        status: blog.status,
        image: blog.image,
        category: blog.category,
        author: blog.author,
        authorAvatar: blog.authorAvatar,
        date: blog.date,
        readTime: blog.readTime,
        likes: blog.likes || 0,
        comments: blog.comments || [],
      };

      if (req.user) {
        return { ...baseInfo, content: blog.content };
      }

      return baseInfo;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get blog by ID (with partial content if NOT logged in)
// @route   GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (req.user) {
        return res.json(blog);
      }

      return res.json({
        _id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt,
        isPremium: blog.isPremium,
        image: blog.image,
        category: blog.category,
        author: blog.author,
        authorAvatar: blog.authorAvatar,
        date: blog.date,
        readTime: blog.readTime,
        likes: blog.likes,
        comments: [], // Return empty array if not logged in
        message: "Login to read full article",
      });
    } else {
      res.status(404).json({ message: "Blog NOT found" });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Blog ID format" });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create blog (for development/admin only, skip protection logic here for now)
const createBlog = async (req, res) => {
  const { title, excerpt, content, isPremium } = req.body;
  try {
    const blog = new Blog({ title, excerpt, content, isPremium });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getBlogs, getBlogById, createBlog };
