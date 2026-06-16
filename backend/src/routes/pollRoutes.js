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
  createPoll,
  getPolls,
  getPollById,
  vote,
  closePoll
} = require(
  "../controllers/pollController"
);

router.get("/", auth, getPolls);

router.get(
  "/:id",
  auth,
  getPollById
);

router.post(
  "/",
  auth,
  role("admin"),
  createPoll
);

router.post(
  "/vote",
  auth,
  vote
);

router.put(
  "/close/:id",
  auth,
  role("admin"),
  closePoll
);

module.exports = router;