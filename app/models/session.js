const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  video: [
    {
      url: {
        type: String,
      },
      playing: {
        type: Boolean,
        default: true,
      },
      played: {
        type: Number,
      },
      loaded: {
        type: Number,
      },
      duration: {
        type: Number,
      },
    },
  ],
  users: [
    {
      user: {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
      status: {
        type: Boolean,
      },
    },
  ],
  createdBy: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  currentPlayer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = {
  Session,
};
