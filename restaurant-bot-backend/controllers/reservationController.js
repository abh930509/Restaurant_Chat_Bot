const db = require("../models/db");

exports.createReservation = (req, res) => {
  const { name, email, date, time, notes } = req.body;

  if (!name || !email || !date || !time) {
    return res
      .status(400)
      .json({ message: "Name, email, date, and time are required" });
  }

  const query = `
    INSERT INTO reservations (name, email, date, time, notes, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())`;

  db.query(query, [name, email, date, time, notes], (err, result) => {
    if (err) {
      console.error("Error creating reservation:", err);
      return res.status(500).json({ message: "Reservation failed" });
    }

    res.status(201).json({
      message: "Reservation confirmed 🎉",
      reservation_id: result.insertId,
    });
  });
};

exports.getReservations = (req, res) => {
  const { email } = req.query;

  const query = email
    ? `SELECT * FROM reservations WHERE email = ? ORDER BY date, time`
    : `SELECT * FROM reservations ORDER BY date, time`;

  const params = email ? [email] : [];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      return res
        .status(500)
        .json({ message: "Could not retrieve reservations" });
    }

    res.json(results);
  });
};

exports.cancelReservation = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM reservations WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting reservation:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation cancelled" });
  });
};
