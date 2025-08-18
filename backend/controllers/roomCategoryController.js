const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const RoomCategory = require("../models/roomCategoryModel");

const seedCategories = asyncHandler(async (req, res) => {
const defaultCategories = [
  {
    name: "Mercury Room",
    defaultPrice: 18500,
    totalRooms: 12,
    avalibleRooms: 12,
    description: "Cozy student-size room",
  },
  {
    name: "Venus Room",
    defaultPrice: 25000,
    totalRooms: 3,
    avalibleRooms: 3,
    description: "Another student-size option",
  },
  {
    name: "Silver Room",
    defaultPrice: 44500,
    totalRooms: 11,
    avalibleRooms: 11,
    description: "Comfortable standard room",
  },
  {
    name: "Gold Room",
    defaultPrice: 55500,
    totalRooms: 10,
    avalibleRooms: 10,
    description: "Spacious standard room",
  },
  {
    name: "Gold+ Room",
    defaultPrice: 70000,
    totalRooms: 12,
    avalibleRooms: 12,
    description: "Premium standard experience",
  },
  {
    name: "Diamond suite",
    defaultPrice:75000,
    totalRooms: 2,
    avalibleRooms: 2,
    description: "Luxury suite",
  },
  {
    name: "Platinum Suite",
    defaultPrice: 87000,
    totalRooms: 2,
    avalibleRooms: 2,
    description: "Exclusive premium suite",
  },
  {
    name: "Presidential Suite",
    defaultPrice: 110000,
    totalRooms: 2,
    avalibleRooms: 2,
    description: "Ultimate luxury suite",
  },
];

for (const category of defaultCategories) {
  const existingCategory = await RoomCategory.findOne({ name: category.name });
  if (!existingCategory) {
    await RoomCategory.create(category);
  }
}
 res.status(201).json(defaultCategories,{ message: " Default Room categories seeded successfully" });
});

module.exports = {
  seedCategories,
};

