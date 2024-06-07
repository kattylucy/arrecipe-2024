const Ingredient = require("../models/Ingredient");

const getAllIngredients = async (req, res) => {
  try {
    const query = req.query;

    const ingredients = await Ingredient.find({
      name: { $regex: `^${query.name}` },
    });
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllIngredients,
};
