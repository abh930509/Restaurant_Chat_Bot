const db = require("../models/db");

exports.getMenuByRestaurant = (req, res) => {
  const { restaurantId } = req.params;

  const query = "SELECT * FROM menu WHERE restaurant_id = ?";
  db.query(query, [restaurantId], (err, results) => {
    if (err) {
      console.error("Error fetching menu:", err);
      return res.status(500).json({ message: "Server Error" });
    }
    res.json(results);
  });
};

// Add a new menu item
exports.addMenuItem = (req, res) => {
  const { name, description, price, category, image_url, restaurant_id } =
    req.body;

  const query = `
    INSERT INTO menu (name, description, price, category, image_url, restaurant_id)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [name, description, price, category, image_url, restaurant_id],
    (err, result) => {
      if (err) {
        console.error("Error adding menu item:", err);
        return res.status(500).json({ message: "Failed to add item" });
      }
      res
        .status(201)
        .json({ message: "Menu item added successfully", id: result.insertId });
    }
  );
};

// Update a menu item
exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;

  const query = `
    UPDATE menu
    SET name = ?, description = ?, price = ?, category = ?, image_url = ?
    WHERE id = ?`;

  db.query(
    query,
    [name, description, price, category, image_url, id],
    (err, result) => {
      if (err) {
        console.error("Error updating menu item:", err);
        return res.status(500).json({ message: "Failed to update item" });
      }
      res.json({ message: "Menu item updated successfully" });
    }
  );
};

// Delete a menu item
exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM menu WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting menu item:", err);
      return res.status(500).json({ message: "Failed to delete item" });
    }
    res.json({ message: "Menu item deleted successfully" });
  });
};

exports.getAllMenuItems = (req, res) => {
  const query = "SELECT id, name, price, image_url FROM menu LIMIT 10";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching all menu items:", err);
      return res.status(500).json({ message: "Failed to fetch menu" });
    }

    res.json(results);
  });
};
