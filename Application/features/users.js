const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are mandatory");
    }

    const isUserAvailable = await User.findOne({ email: email });
    if (isUserAvailable) {
      throw new Error("User Already Registered!");
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log(`User Created: ${newUser}`);
    res.status(200).json({ _id: newUser._id, email: newUser.email });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are mandatory");
  }
  const isUserAvailable = await User.findOne({ email: email });
  if (isUserAvailable && bcrypt.compare(password, isUserAvailable.password)) {
    //provide a access token
    const accessToken = jwt.sign(
      {
        user: {
          username: isUserAvailable.username,
          email: isUserAvailable.email,
          id: isUserAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
    throw new Error("Email or password is not valid");
  } else {
    res.status(400);
  }
  res.json({ mssg: "Login the user" });
});

//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
