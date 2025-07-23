const db = require("../models/db");

// 📍 GET all restaurants (optional filters)
exports.getRestaurants = (req, res) => {
  const { location, cuisine, search } = req.query;

  let query = `SELECT * FROM restaurants WHERE 1`;
  const params = [];

  if (location) {
    query += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  if (cuisine) {
    query += " AND cuisine LIKE ?";
    params.push(`%${cuisine}%`);
  }

  if (search) {
    query += " AND (name LIKE ? OR description LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching restaurants:", err);
      return res.status(500).json({ message: "Could not load restaurants" });
    }

    res.json(results);
  });
};

// 🌟 GET popular restaurant tags (bonus)
exports.getPopularTags = (req, res) => {
  const query = `
    SELECT cuisine, COUNT(*) as count
    FROM restaurants
    GROUP BY cuisine
    ORDER BY count DESC
    LIMIT 5
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tags:", err);
      return res.status(500).json({ message: "Tag generation failed" });
    }

    res.json({ popularTags: results.map((r) => r.cuisine) });
  });
};
