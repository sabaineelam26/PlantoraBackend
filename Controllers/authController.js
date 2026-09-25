const jwt = require("jsonwebtoken"); 
const User = require("../models/User"); 

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async(req, res) => {
    const {name, email, password} = req.body; 
    const exists = await User.findOne({email}); 
    if(exists) return res.status(400).json({ message: "User already exists" }); 

    const user = await User.create({name, email, password, role: "user"}); 

    res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id),
      });
}; 


exports.login = async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email}); 

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } else{
     res.status(401).json({ message: "Invalid credentials" });
  }
}


// Get logged-in user
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
};


// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};


// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Set new password
    user.password = newPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to change password",
      error: error.message,
    });
  }
};
