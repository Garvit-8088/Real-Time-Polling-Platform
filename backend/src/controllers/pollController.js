const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

exports.createPoll = async (
  req,
  res
) => {
  try {

    const {
      question,
      description,
      options
    } = req.body;

    const poll =
      await Poll.create({
        question,
        description,
        options,
        organizationId:
          req.user.organizationId,
        createdBy:
          req.user.userId
      });

    req.io
      .to(req.user.organizationId)
      .emit("poll:create", poll);

    res.status(201).json(poll);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to create poll"
    });
  }
};

exports.getPolls = async (
  req,
  res
) => {
  const polls =
  await Poll.find({
    organizationId:
      req.user.organizationId
  }).sort({
    createdAt: -1
  });

  res.json(polls);
};

exports.vote = async (req, res) => {
  try {
    const { pollId, optionId } =
      req.body;

    const alreadyVoted =
      await Vote.findOne({
        pollId,
        userId: req.user.userId
      });

    if (alreadyVoted) {
      return res.status(400).json({
        message:
          "Already voted on this poll"
      });
    }

    const poll =
      await Poll.findOne({
        _id: pollId,
        organizationId:
          req.user.organizationId
      });

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found"
      });
    }

    if (poll.status === "closed") {
      return res.status(400).json({
        message: "Poll closed"
      });
    }

    const option =
  poll.options.id(optionId);

if (!option) {
  return res.status(400).json({
    message:
      "Invalid option"
  });
}

option.votes++;

    await poll.save();

    await Vote.create({
      organizationId:
        req.user.organizationId,
      pollId,
      optionId,
      userId: req.user.userId
    });

    req.io
      .to(req.user.organizationId)
      .emit("poll:vote", poll);

    res.json(poll);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.closePoll = async (
  req,
  res
) => {
  try {

    const poll =
      await Poll.findOne({
        _id: req.params.id,
        organizationId:
          req.user.organizationId
      });

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found"
      });
    }

    poll.status = "closed";

    await poll.save();

    req.io
      .to(req.user.organizationId)
      .emit("poll:close", poll);

    res.json(poll);

  } catch (error) {
    res.status(500).json({
      message: "Failed to close poll"
    });
  }
};

exports.getPollById = async (
  req,
  res
) => {
  try {

    const poll =
      await Poll.findOne({
        _id: req.params.id,
        organizationId:
          req.user.organizationId
      });

    if (!poll) {
      return res.status(404).json({
        message:
          "Poll not found"
      });
    }

    res.json(poll);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch poll"
    });

  }
};