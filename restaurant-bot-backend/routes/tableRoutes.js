const express = require("express");
const router = express.Router();
const {
  getAllTables,
  getTableById,
  reserveTable,
  releaseTable,
} = require("../controllers/tableController");

// GET all tables (with optional ?available=true)
router.get("/", getAllTables);

//  GET a single table by ID
router.get("/:id", getTableById);

// Reserve a table (set is_available = false)
router.put("/:id/reserve", reserveTable);

// Release a table (set is_available = true)
router.put("/:id/release", releaseTable);

module.exports = router;
