const db = require("../models/db");

exports.placeOrder = (req, res) => {
  const { user_id, items, total_amount, payment_status = "Pending" } = req.body;
  const timestamp = new Date();

  const orderQuery = `
    INSERT INTO orders (user_id, total_amount, payment_status, order_status, created_at)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(
    orderQuery,
    [user_id, total_amount, payment_status, "Preparing", timestamp],
    (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        return res.status(500).json({ message: "Failed to place order" });
      }

      const order_id = result.insertId;

      const itemQuery = `
        INSERT INTO order_items (order_id, item_name, quantity, price)
        VALUES ?`;

      const itemValues = items.map((item) => [
        order_id,
        item.name,
        item.quantity,
        item.price,
      ]);

      db.query(itemQuery, [itemValues], (itemErr) => {
        if (itemErr) {
          console.error("Error inserting order items:", itemErr);
          return res
            .status(500)
            .json({ message: "Order placed but item insertion failed" });
        }

        res
          .status(201)
          .json({ message: "Order placed successfully", order_id });
      });
    }
  );
};

// Get all orders (optionally filter by user)
exports.getOrders = (req, res) => {
  const { user_id } = req.query;
  const query = user_id
    ? "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC"
    : "SELECT * FROM orders ORDER BY created_at DESC";

  db.query(query, user_id ? [user_id] : [], (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
};

exports.updateOrderStatus = (req, res) => {
  const { id: order_id } = req.params;
  const { status } = req.body;

  const query = "UPDATE orders SET order_status = ? WHERE id = ?";
  db.query(query, [status, order_id], (err) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).json({ message: "Failed to update status" });
    }

    res.json({ message: "Order status updated" });
  });
};

exports.deleteOrder = (req, res) => {
  const { id: order_id } = req.params;

  const deleteItemsQuery = "DELETE FROM order_items WHERE order_id = ?";
  const deleteOrderQuery = "DELETE FROM orders WHERE id = ?";

  db.query(deleteItemsQuery, [order_id], (err) => {
    if (err) {
      console.error("Error deleting order items:", err);
      return res.status(500).json({ message: "Failed to cancel order items" });
    }

    db.query(deleteOrderQuery, [order_id], (err2) => {
      if (err2) {
        console.error("Error deleting order:", err2);
        return res.status(500).json({ message: "Failed to cancel order" });
      }
      res.json({ message: "Order cancelled successfully" });
    });
  });
};

// Get tracking info of an order
exports.getTrackingInfo = (req, res) => {
  const { id: order_id } = req.params;

  const query = `
    SELECT id, order_status, created_at,
      TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS minutes_elapsed
    FROM orders
    WHERE id = ?`;

  db.query(query, [order_id], (err, results) => {
    if (err) {
      console.error("Error fetching tracking info:", err);
      return res.status(500).json({ message: "Tracking info fetch failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = results[0];
    res.json({
      order_id: order.id,
      status: order.order_status,
      created_at: order.created_at,
      minutes_elapsed: order.minutes_elapsed,
      estimated_delivery_in: Math.max(0, 30 - order.minutes_elapsed) + " mins",
    });
  });
};
