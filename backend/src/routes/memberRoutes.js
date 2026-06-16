const express = require("express");

const router =
  express.Router();

const auth = require(
  "../middleware/authMiddleware"
);

const role = require(
  "../middleware/roleMiddleware"
);

const {
  getMembers
} = require(
  "../controllers/memberController"
);

router.get(
  "/",
  auth,
  role("admin"),
  getMembers
);

module.exports = router;