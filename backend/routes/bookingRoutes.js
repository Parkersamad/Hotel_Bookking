const express = require("express");
const router = express.Router();
const { createBooking, cancelBooking,} = require("../controllers/bookingController");


// Route to create a booking
router.post("/createbooking", createBooking);
router.delete("/cancelbooking/:id", cancelBooking);

module.exports = router;