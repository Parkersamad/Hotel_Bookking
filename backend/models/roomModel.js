const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Please add a room number"],
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: [true, "Please select a room category"],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
