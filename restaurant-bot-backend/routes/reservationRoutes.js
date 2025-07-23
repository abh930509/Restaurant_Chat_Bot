const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservations,
  cancelReservation,
} = require("../controllers/reservationController");

router.post("/", createReservation);
router.get("/", getReservations);
router.delete("/:id", cancelReservation);

module.exports = router;
