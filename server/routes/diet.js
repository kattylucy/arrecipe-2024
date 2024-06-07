const express = require("express");
const Diet = require("../models/Diet");
const router = express.Router();

// Route to fetch all diets
router.get("/", async (req, res) => {
  try {
    const diets = await Diet.find();
    res.status(200).json(diets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
