const mongoose = require("mongoose");

const roomCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "Mercury Room",
        "Venus Room",
        "Silver Room",
        "Gold Room",
        "Gold+ Room",
        "Diamond suite",
        "Platinum Suite",
        "Presidential Suite",
      ],
      required: [true, "Please select a room category"],
      trim: true,
      unique: true,
    },
    defaultPrice: {
      type: Number,
      required: [true, "Please add a default price for the room category"],
    },
    totalRooms: {
      type: Number,
      required: [true, "Please add the total number of rooms in this category"],
      min: [1, "Total rooms must be at least 1"],
    },
    avalibleRooms: {
      type: Number,
      required: [
        true,
        "Please add the number of available rooms in this category",
      ],
    },
    description: {
      type: String,
      required: [true, "Please add a description for the room category"],
      trim: true,
    },
  },
  { timestamps: true }
);
const RoomCategory = mongoose.model("RoomCategory", roomCategorySchema);
module.exports = RoomCategory;
