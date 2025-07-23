const express = require("express");
const router = express.Router();
const {
  processPayment,
  getPaymentStatus,
  updatePaymentStatus,
} = require("../controllers/paymentController");

// Simulate payment processing
router.post("/", processPayment);

// Get payment status for an order
router.get("/:order_id", getPaymentStatus);

// Update a specific payment status manually or via webhook
router.put("/:payment_id", updatePaymentStatus);

module.exports = router;
