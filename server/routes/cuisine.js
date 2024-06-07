const express = require("express");
const { getAllCuisine } = require("../controllers/cuisineController");
const router = express.Router();

// Route to fetch all
router.get("/", getAllCuisine);

module.exports = router;
