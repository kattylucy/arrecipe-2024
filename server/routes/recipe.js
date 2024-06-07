const express = require("express");
const router = express.Router();
const { addRecipe } = require("../controllers/recipeController");

router.post("/add", addRecipe);

module.exports = router;
