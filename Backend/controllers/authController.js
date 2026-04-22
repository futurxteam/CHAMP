import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import generateToken from "../utils/generateToken.js";

// @desc    Unified signup — L1 (basic) or L2 (contributor with expertise)
// @route   POST /api/auth/signup
// @access  Public
export const signupUser = async (req, res) => {
  const { name, email, password, expertise, expertiseLevel } = req.body;

  try {
    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // 2. Check duplicate
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Determine role based on expertise level
    const expertiseArray = expertise
      ? expertise.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const isContributor = expertiseArray.length > 0;
    
    let role = "L1";
    if (isContributor) {
      if (expertiseLevel === "Expert") role = "L3";
      else if (expertiseLevel === "Intermediate") role = "L2";
      else role = "L1"; // Beginner gets L1 tag
    }

    const status = isContributor ? "pending" : "approved";

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      status,
      expertise: expertiseArray,
      expertiseLevel: expertiseLevel || undefined,
      isContributor,
      proofUrl: req.file ? req.file.path : "",
    });

    // 5. Create linked user profile
    await UserProfile.create({ user: user._id });

    // 6. Return token + user info
    res.status(201).json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        isContributor: user.isContributor,
      },
      message: isContributor
        ? "Contributor registration submitted. Await admin approval."
        : "Account created successfully.",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Block check
    if (user.status === "blocked") {
      return res.status(403).json({ message: "Your account has been blocked" });
    }

    // 5. Contributor pending check
    if (user.isContributor && user.status === "pending") {
      return res.status(403).json({
        message: "Your contributor account is pending admin approval",
      });
    }

    // 6. Success
    res.json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        isContributor: user.isContributor,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};