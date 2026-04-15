import User from "../models/User.js";

// @desc    Get all users (excluding current user)
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user?._id } }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsers };
