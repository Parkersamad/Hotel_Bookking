const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");

const createBooking = asyncHandler(async (req, res) => {
  const {
    roomCategory: room,
    guestName,
    guestEmail,
    guestPhone,
    roomNumber,
    checkInDate,
    checkOutDate,
    numberOfGuests,
  } = req.body;

  //Auto-generate booking ID
  const bookingId = "UGH" + Date.now().toString().slice(-6);

  const booking = await Booking.create({
    bookingId,
    roomCategory: room,
    guestName,
    guestEmail,
    guestPhone,
    roomNumber,
    checkInDate,
    checkOutDate,
    numberOfGuests,
  });

  res.status(201).json({
    success: true,
    data: booking,
  });
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("room");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

module.exports = {
  createBooking,
  getBookingById,
};
