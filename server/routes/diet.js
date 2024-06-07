const express = require("express");
const { getAllDiet } = require("../controllers/dietController");
const router = express.Router();

// Route to fetch all
router.get("/", getAllDiet);

module.exports = router;
