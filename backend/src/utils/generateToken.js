const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      organizationId: user.organizationId,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};