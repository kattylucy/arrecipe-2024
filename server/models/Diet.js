const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
