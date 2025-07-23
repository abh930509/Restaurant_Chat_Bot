const db = require("../models/db");

exports.getAllTables = (req, res) => {
  const { available } = req.query;

  let query = "SELECT * FROM tables";
  const params = [];

  if (available !== undefined) {
    query += " WHERE is_available = ?";
    params.push(available === "true" ? 1 : 0);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching tables:", err);
      return res.status(500).json({ message: "Failed to load tables" });
    }
    res.json(results);
  });
};

exports.getTableById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM tables WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching table:", err);
      return res.status(500).json({ message: "Failed to get table" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(results[0]);
  });
};

exports.reserveTable = (req, res) => {
  const { id } = req.params;

  const query = "UPDATE tables SET is_available = 0 WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error reserving table:", err);
      return res.status(500).json({ message: "Reservation failed" });
    }
    res.json({ message: "Table reserved successfully" });
  });
};

exports.releaseTable = (req, res) => {
  const { id } = req.params;

  const query = "UPDATE tables SET is_available = 1 WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error releasing table:", err);
      return res.status(500).json({ message: "Release failed" });
    }
    res.json({ message: "Table released successfully" });
  });
};
