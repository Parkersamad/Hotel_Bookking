const mongoose = require("mongoose");

const roomCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "Mercury",
        "Venus",
        "Silver",
        "Gold",
        "Gold+",
        "Diamond",
        "Platinum",
      ],
      required: [true, "Please select a room category"],
      trim: true,
      unique: true,
    },
    defaultPrice: {
      type: Number,
      required: [true, "Please add a default price for the room category"],
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