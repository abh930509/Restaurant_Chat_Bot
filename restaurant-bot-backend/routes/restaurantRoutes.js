const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getPopularTags,
} = require("../controllers/restaurantController");

// GET /api/restaurants
router.get("/", getRestaurants);

// GET /api/restaurants/tags
router.get("/tags", getPopularTags);

module.exports = router;
