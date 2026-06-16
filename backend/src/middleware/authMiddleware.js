const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(
      "Authorization:",
      req.headers.authorization
    );

    const token =
      req.headers.authorization?.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded User:", decoded);

    req.user = decoded;

    next();

  } catch (error) {

    console.log(
      "JWT Error:",
      error.message
    );

    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};