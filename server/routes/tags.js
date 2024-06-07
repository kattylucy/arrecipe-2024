const express = require("express");
const { getAllTags } = require("../controllers/tagsController");
const router = express.Router();

// Route to fetch all
router.get("/", getAllTags);

module.exports = router;
