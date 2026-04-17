// @desc    Register normal user
// @route   POST /api/auth/register
// @access  Public

import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import generateToken from "../utils/generateToken.js";
import SpeakerProfile from "../models/SpeakerProfile.js";
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Create user (role = user by default)
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      status: "approved", // normal users auto-approved
    });

    // 4. Create user profile
    const profile = await UserProfile.create({
      user: user._id,
      
    });

    // 5. Send response
    res.status(201).json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const registerSpeaker = async (req, res) => {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const {
      name,
      email,
      password,
      topics,
      expertiseLevel,
      pricing,
      socialLinks,
    } = req.body;

    // 🔴 Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !topics ||
      topics.length === 0 ||
      !expertiseLevel
    ) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "All required speaker fields must be provided",
      });
    }

    // Check existing user
    const userExists = await User.findOne({ email }).session(session);

    if (userExists) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User already exists" });
    }

    // 1. Create User (pending)
    const user = await User.create(
      [
        {
          name,
          email: email.toLowerCase(),
          password,
          role: "speaker",
          status: "pending",
        },
      ],
      { session }
    );

    // 2. Create User Profile
    await UserProfile.create(
      [
        {
          user: user[0]._id,
        },
      ],
      { session }
    );

    // 3. Create Speaker Profile (FULL DATA)
    const speakerProfile = await SpeakerProfile.create(
      [
        {
          user: user[0]._id,
          topics,
          expertiseLevel,
          pricing,
          socialLinks,
          profileCompleted: true, // ✅ already complete
          verified: false,
        },
      ],
      { session }
    );

    // 4. Link speaker profile
    user[0].speakerProfile = speakerProfile[0]._id;
    await user[0].save({ session });

    await session.commitTransaction();
    session.endSession();

    // 5. Response
    res.status(201).json({
      message:
        "Speaker registration submitted successfully. Await admin approval.",
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};



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

    // 🔥 4. Special check for speaker
    if (user.role === "speaker" && user.status !== "approved") {
      return res.status(403).json({
        message: "Your account is pending admin approval",
      });
    }

    // 5. Success login
    res.json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};