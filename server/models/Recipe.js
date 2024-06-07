const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  step: { type: String, required: true },
  text: { type: String, required: true },
});

const ingredientRefSchema = new mongoose.Schema({
  quantity: { type: String, required: true },
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: [instructionSchema],
  cuisine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cuisine",
    required: true,
  },
  diet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diet" }],
  intolerance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Intolerance" }],
  prepTime: { type: Number, required: true },
  caloriesPerServing: { type: Number, required: true },
  ingredients: [ingredientRefSchema],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  servingSize: { type: Number, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
