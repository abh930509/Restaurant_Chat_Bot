const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "restaurant_bot",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

const getAllRestaurants = async (filters = {}) => {
  let query = "SELECT * FROM restaurants";
  const values = [];

  if (filters.cuisine || filters.location) {
    query += " WHERE";
    if (filters.cuisine) {
      query += " cuisine = ?";
      values.push(filters.cuisine);
    }
    if (filters.location) {
      if (values.length) query += " AND";
      query += " location = ?";
      values.push(filters.location);
    }
  }

  const [rows] = await db.query(query, values);
  return rows;
};

const getMenuByRestaurantId = async (restaurantId) => {
  const [rows] = await db.query("SELECT * FROM menu WHERE restaurant_id = ?", [
    restaurantId,
  ]);
  return rows;
};

const getMenuItems = async (limit = 5) => {
  const [rows] = await db.query(
    "SELECT name, price, image_url FROM menu LIMIT ?",
    [limit]
  );
  return rows;
};

const createReservation = async ({
  name,
  email,
  guests,
  date,
  time,
  special_requests,
}) => {
  const [result] = await db.query(
    "INSERT INTO reservations (name, email, guests, date, time, special_requests) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, guests, date, time, special_requests || ""]
  );
  return result.insertId;
};

const createOrder = async ({ user_id, items, total, status }) => {
  const [result] = await db.query(
    "INSERT INTO orders (user_id, items, total, status) VALUES (?, ?, ?, ?)",
    [user_id, JSON.stringify(items), total, status]
  );
  return result.insertId;
};

const getOrderById = async (orderId) => {
  const [rows] = await db.query("SELECT * FROM orders WHERE id = ?", [orderId]);
  return rows[0];
};

const getRecommendations = async (user_id) => {
  const [rows] = await db.query("SELECT * FROM menu ORDER BY RAND() LIMIT 3");
  return rows;
};

const createUser = async ({ name, email }) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

module.exports = {
  db,
  getAllRestaurants,
  getMenuByRestaurantId,
  getMenuItems,
  createReservation,
  createOrder,
  getOrderById,
  getRecommendations,
  createUser,
  getUserByEmail,
};
