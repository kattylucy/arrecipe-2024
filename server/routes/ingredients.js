const express = require("express");
const { getAllIngredients } = require("../controllers/ingredientsController");
const router = express.Router();

// Route to fetch all ingredients
router.get("/", getAllIngredients);

module.exports = router;
