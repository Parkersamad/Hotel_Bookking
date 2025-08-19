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
      defaultPrice: 75000,
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
    const existingCategory = await RoomCategory.findOne({
      name: category.name,
    });
    if (!existingCategory) {
      await RoomCategory.create(category);
    }
  }
  res.status(201).json(defaultCategories, {
    message: " Default room categories seeded successfully",
  });
});

// get all room categories
// @route GET /api/roomcategories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await RoomCategory.find(req.params.id);
  res.status(200).json(categories);

  if (!categories) {
    res.status(404);
    throw new Error("No room categories found");
  } else {
    res.status(200).json(categories);
  }
});

// get room category by name
// @route GET /api/roomcategories/:name
const getCategoryByName = asyncHandler(async (req, res) => {
  const category = await RoomCategory.findOne({ name: req.params.name });
  if (!category) {
    res.status(404);
    throw new Error("Room category not found");
  }
  res.status(200).json(category);
});

// update room price or avalible rooms or total rooms or description.
// @route PUT /api/roomcategories/:id
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { defaultPrice, avalibleRooms, totalRooms, description } = req.body;

  const category = await RoomCategory.findById(name);
  if (!category) {
    res.status(404);
    throw new Error("Room category not found");
  }

  if (defaultPrice !== undefined) category.defaultPrice = defaultPrice;
  if (avalibleRooms !== undefined) category.avalibleRooms = avalibleRooms;
  if (totalRooms !== undefined) category.totalRooms = totalRooms;
  if (description !== undefined) category.description = description;

  await category.save();
  res.status(200).json(category);
  if (!category) {
    res.status(404);
    throw new Error("Room category not found");
  }
  res.status(200).json(updatedCategory);
});

module.exports = {
  seedCategories,
  getAllCategories,
  getCategoryByName,
  updateCategory,
};
