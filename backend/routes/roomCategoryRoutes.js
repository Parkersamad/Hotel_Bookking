const express = require("express");
const {seedCategories, getAllCategories, getCategoryByName, updateCategory } = require("../controllers/roomCategoryController");
const router = express.Router();


router.post("/seed", seedCategories);
router.get("/", getAllCategories);
router.get("/:name", getCategoryByName);
router.put("/:name", updateCategory);

module.exports = router;