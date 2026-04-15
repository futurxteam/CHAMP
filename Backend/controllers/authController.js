import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id, user.role),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bio: user.bio,
          avatar: user.avatar,
          organization: user.organization,
          experience: user.experience,
          connections: user.connections,
          interests: user.interests,
          savedBlogs: user.savedBlogs,
          savedEvents: user.savedEvents,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id, user.role),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bio: user.bio,
          avatar: user.avatar,
          organization: user.organization,
          experience: user.experience,
          connections: user.connections,
          interests: user.interests,
          savedBlogs: user.savedBlogs,
          savedEvents: user.savedEvents,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      organization: user.organization,
      experience: user.experience,
      connections: user.connections,
      interests: user.interests,
      savedBlogs: user.savedBlogs,
      savedEvents: user.savedEvents,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export { registerUser, loginUser, getCurrentUser };
