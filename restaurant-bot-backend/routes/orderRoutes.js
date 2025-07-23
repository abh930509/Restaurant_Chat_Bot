const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getTrackingInfo,
} = require("../controllers/orderController");

// Create a new order
router.post("/", placeOrder);

// Get all orders or filter by user_id
router.get("/", getOrders);

// Update order status (e.g., Preparing → Out for Delivery)
router.put("/:id", updateOrderStatus);

// Cancel/Delete an order
router.delete("/:id", deleteOrder);

// Get tracking info for a specific order
router.get("/tracking/:id", getTrackingInfo);

module.exports = router;
