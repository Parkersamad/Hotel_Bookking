const express = require("express");
const {seedCategories } = require("../controllers/roomCategoryController");
const router = express.Router();


router.post("/seed", seedCategories);


module.exports = router;