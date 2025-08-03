const express = require("express");
const router = express.Router();
const { createBooking, getBookingById } = require("../controllers/bookingController");


// Route to create a booking
router.post("/createbooking", createBooking);
// Route to get a booking by ID
router.get("/:id", getBookingById);

module.exports = router;