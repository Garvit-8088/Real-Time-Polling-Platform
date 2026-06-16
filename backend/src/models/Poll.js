const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    question: {
      type: String,
      required: true,
      trim: true
    },

    description: String,

    options: {
  type: [
    {
      text: {
        type: String,
        required: true,
        trim: true
      },
      votes: {
        type: Number,
        default: 0
      }
    }
  ],
  validate: {
    validator: function(v) {
      return v.length >= 2;
    },
    message:
      "A poll must have at least 2 options"
  }
},

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
  
);

pollSchema.index({
  organizationId: 1
});


module.exports = mongoose.model(
  "Poll",
  pollSchema
);