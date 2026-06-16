const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Organization = require("../models/Organization");

const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  try {
    const {
      organizationName,
      name,
      email,
      password
    } = req.body;

    const existing = await User.findOne({
      email
    });

    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const organization =
      await Organization.create({
        name: organizationName
      });

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      organizationId: organization._id,
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};