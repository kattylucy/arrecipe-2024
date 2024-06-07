const mongoose = require("mongoose");

const intoleranceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Intolerance = mongoose.model("Intolerance", intoleranceSchema);

module.exports = Intolerance;
