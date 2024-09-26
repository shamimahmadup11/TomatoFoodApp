const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    const token = creatToken(user._id);

    res.json({
      success: true,
      token: token,
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message,
    });
  }
};

// create the token

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checkin if user already exist
    const exists = await UserModel.find({ email });
    if (exists.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // validatin email and pass
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "please enter Strong password",
      });
    }
    // hasing the password
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hassedPassword,
    });

    const user = await newUser.save();
    const token = creatToken(user._id);
    res.json({
      success: true,
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const UserController = {
  login,
  register,
};

module.exports = UserController;
