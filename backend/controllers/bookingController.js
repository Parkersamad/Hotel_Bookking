const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const RoomCategory = require("../models/roomCategoryModel");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const createBooking = asyncHandler(async (req, res) => {
  const {
    guestName,
    guestEmail,
    guestPhone,
    roomCategory, // this is the category name
    checkInDate,
    checkOutDate,
    numberOfGuests,
  } = req.body;

  // Validate required fields
  if (
    !guestName ||
    !guestEmail ||
    !guestPhone ||
    !roomCategory ||
    !checkInDate ||
    !checkOutDate ||
    !numberOfGuests
  ) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  // Fetch room category details
  const category = await RoomCategory.findById(roomCategory);
  if (!category) {
    res.status(404);
    throw new Error("Room category not found");
  }

  // Check if rooms are available
  if (category.availableRooms <= 0) {
    res.status(400);
    throw new Error("No available rooms in this category");
  }

  // Prevent duplicate bookings from same user for same period
  const existingBooking = await Booking.findOne({
    guestEmail,
    checkInDate,
    checkOutDate,
  });

  if (existingBooking) {
    res.status(400);
    throw new Error("You already have a booking for these dates");
  }

   // Generate booking ID
  let bookingId;
  let isUnique = false;
  while (!isUnique) {
    const today = new Date();
    const yymmdd = today.toISOString().slice(2, 10).replace(/-/g, "");
    const rand = Math.floor(1000 + Math.random() * 9000);
    const tempId = `UGH-${yymmdd}-${rand}`;

    const exists = await Booking.findOne({ bookingId: tempId });
    if (!exists) {
      bookingId = tempId;
      isUnique = true;
    }
  }

  // Create new booking with booking iD
  const booking = await Booking.create({
    bookingId,
    roomCategory: category._id,
    price: category.price, // use correct property name
    guestName,
    guestEmail,
    guestPhone,
    checkInDate,
    checkOutDate,
    numberOfGuests,
  });

  // Reduce available room count
  category.availableRooms -= 1;
  await category.save();

  // send confrimation email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: guestEmail,
    subject: "Booking Confirmation",
    text: `Dear ${guestName},\n\nYour booking has been confirmed!\nBooking ID: ${bookingId}\nRoom Category: ${category.name}\nCheck-in Date: ${checkInDate}\nCheck-out Date: ${checkOutDate}\nNumber of Guests: ${numberOfGuests}\n\nThank you for choosing us!\n\nBest regards,\nHotel Management`,
  };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error("Error sending email:", error);
        } else {
        console.log("Email sent:", info.response);
        }
    });

    res.status(201).json({
    message: "Booking created successfully",
    booking
});

// If you want to return the booking details
  // res.status(201).json(booking);

  // If you want to return the booking ID only
  // res.status(201).json({ bookingId: booking.bookingId });
}
);

// cancel booking
const cancelBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    
    // Find the booking
    const booking = await Booking.findOne({ bookingId });
    
    if(!booking) {
        res.status(404);
        throw new Error("Booking not found");
    }

    // Restore the available room count
    const category = await RoomCategory.findById(booking.roomCategory);
    if (category) {
        category.availableRooms += 1;
        await category.save();
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking cancelled successfully" });

});

module.exports = {
  createBooking,
  cancelBooking,
};
