const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      trim: true,
    },
    roomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: [true, "Please select a room category"],
    },
    price: {
      type: Number,
      required: true,
    },
    guestName: {
      type: String,
      required: [true, "Please add  the check-in guest name"],
      trim: true,
    },
    guestEmail: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    guestPhone: {
      type: String,
      required: [true, "Please enter a valid phone number"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^0[7-9][01][0-9]{8}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    roomNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Please select a room number"],
      trim: true,
    },
    checkInDate: {
      type: Date,
      required: [true, "Please add a check-in date"],
    },
    checkOutDate: {
      type: Date,
      required: [true, "Please add a check-out date"],
      validate: {
        validator: function (v) {
          return v > this.checkInDate;
        },
        message: "Check-out date must be after check-in date",
      },
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Please add the number of guests"],
      min: [1, "At least one guest is required"],
    },
    status: {
      type: String,
      enum: ["pending", "Booked", "checkedIn", "checkedOut", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
// const Booking = mongoose.model("Booking", bookingSchema);
