const db = require("../models/db");

exports.getPersonalizedRecommendations = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT m.name, m.image, COUNT(*) as freq
    FROM order_items oi
    JOIN menu m ON oi.item_name = m.name
    JOIN orders o ON o.id = oi.order_id
    WHERE o.user_id = ?
    GROUP BY m.name, m.image
    ORDER BY freq DESC
    LIMIT 5;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching personalized recommendations:", err);
      return res.status(500).json({ message: "Internal error" });
    }

    if (results.length === 0) {
      return exports.getTopDishes(req, res); // fallback
    }

    res.json({ type: "personalized", items: results });
  });
};

exports.getTopDishes = (req, res) => {
  const query = `
    SELECT m.name, m.image, COUNT(*) as freq
    FROM order_items oi
    JOIN menu m ON oi.item_name = m.name
    GROUP BY m.name, m.image
    ORDER BY freq DESC
    LIMIT 5;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching popular fallback recommendations:", err);
      return res
        .status(500)
        .json({ message: "Could not fetch fallback recommendations" });
    }

    res.json({ type: "popular", items: results });
  });
};
