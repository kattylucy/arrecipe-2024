const express = require("express");
const { getAllIntolerances } = require("../controllers/IntolerancesController");
const router = express.Router();

// Route to fetch all
router.get("/", getAllIntolerances);

module.exports = router;
