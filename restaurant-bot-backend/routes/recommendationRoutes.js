const express = require("express");
const router = express.Router();
const {
  getPersonalizedRecommendations,
  getTopDishes,
} = require("../controllers/recommendationController");

//  Personalized recommendations using :userId param
router.get("/personalized/:userId", getPersonalizedRecommendations);

//  Top/popular dishes across all users
router.get("/top", getTopDishes);

module.exports = router;
