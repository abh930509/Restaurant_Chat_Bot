const express = require("express");
const router = express.Router();
const {
  getMenuByRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
} = require("../controllers/menuController");

router.get("/", getAllMenuItems);

// Get menu items for a specific restaurant
router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// Add a new menu item
router.post("/", addMenuItem);

// Update an item
router.put("/:id", updateMenuItem);

// Delete an item
router.delete("/:id", deleteMenuItem);

module.exports = router;
