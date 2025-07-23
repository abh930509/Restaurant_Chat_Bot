const db = require("../models/db");

// Simulate Payment Processing
exports.processPayment = (req, res) => {
  const { order_id, method = "MockPay", amount, success = true } = req.body;

  if (!order_id || !amount) {
    return res.status(400).json({ message: "Order ID and amount required" });
  }

  const status = success ? "Success" : "Failed";
  const payment_time = new Date();

  const query = `
    INSERT INTO payments (order_id, amount, method, status, payment_time)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(
    query,
    [order_id, amount, method, status, payment_time],
    (err, result) => {
      if (err) {
        console.error("Payment processing failed:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Update payment status in order
      const updateOrder = `
      UPDATE orders SET payment_status = ? WHERE id = ?`;
      db.query(updateOrder, [status, order_id]);

      res.status(201).json({
        message: "Payment processed",
        payment_id: result.insertId,
        status,
      });
    }
  );
};

// Get Payment Info for an Order
exports.getPaymentStatus = (req, res) => {
  const { order_id } = req.params;

  const query = `
    SELECT * FROM payments WHERE order_id = ? ORDER BY payment_time DESC LIMIT 1`;

  db.query(query, [order_id], (err, results) => {
    if (err) {
      console.error("Error fetching payment:", err);
      return res
        .status(500)
        .json({ message: "Could not retrieve payment info" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No payment found for this order" });
    }

    res.json(results[0]);
  });
};

// Update Payment Status (e.g., after webhook or manual retry)
exports.updatePaymentStatus = (req, res) => {
  const { payment_id } = req.params;
  const { status } = req.body;

  const query = `UPDATE payments SET status = ? WHERE id = ?`;

  db.query(query, [status, payment_id], (err) => {
    if (err) {
      console.error("Failed to update payment status:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Payment status updated", status });
  });
};
