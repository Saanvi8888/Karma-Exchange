const User = require("../models/User");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


const register = async (req, res) => {
  try {
    const { username, email, password} = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,email,password,
    });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        karma: user.karma,
        completedSessions: user.completedSessions,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        karma: user.karma,
        completedSessions: user.completedSessions,
        skills: user.skills,
        bio: user.bio,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, data: user });
};

const updateProfile = async (req, res) => {
  
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (req.body.hasOwnProperty("username")) user.username = req.body.username;
  if (req.body.hasOwnProperty("bio")) user.bio = req.body.bio;
  if (req.body.hasOwnProperty("skills")) user.skills = req.body.skills;

  const updated = await user.save();

  res.json({
    success: true,
    data: updated,
  });
};

const communitySpotlight=async(req,res)=>{
  try {
    const users= await User.find({completedSessions:{$gt:0}})
    .sort({completedSessions:-1})
    .limit(5)
    .select("username karma completedSessions bio");

    res.status(200).json({
      success:true,
      data:users,
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  communitySpotlight,
};


