const User = require("../models/User");

exports.getMembers =
  async (req, res) => {
    try {

      const users =
        await User.find({
          organizationId:
            req.user.organizationId
        }).select("-password");

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch members"
      });

    }
  };

exports.inviteMember =
  async (req, res) => {
    res.json({
      message:
        "Implement email invitation later"
    });
  };