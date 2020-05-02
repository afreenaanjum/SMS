const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  room: {
    type: String,
    required: true,
    unique: true,
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
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  ],
  createdBy: {
    ref: "User",
    type: Schema.Types.ObjectId,
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
