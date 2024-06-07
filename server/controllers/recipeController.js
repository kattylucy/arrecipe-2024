const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Cuisine = require("../models/Cuisine");
const Diet = require("../models/Diet");
const Intolerance = require("../models/Intolerance");
const Tag = require("../models/Tag");

exports.addRecipe = async (req, res) => {
  try {
    const {
      title,
      instructions,
      cuisine,
      diet,
      intolerance,
      prepTime,
      caloriesPerServing,
      ingredients,
      tags,
      servingSize,
    } = req.body;

    const cuisineDoc = await Cuisine.findById(cuisine);
    if (!cuisineDoc) {
      return res.status(400).json({ message: "Invalid cuisine" });
    }

    const ingredientDocs = await Promise.all(
      ingredients.map(async (ing) => {
        const ingredient = await Ingredient.findById(ing.ingredient);
        if (!ingredient) {
          throw new Error("Invalid ingredient");
        }
        return {
          quantity: ing.quantity,
          ingredient: ingredient._id,
        };
      })
    );

    const dietDocs = await Diet.find({ _id: { $in: diet } });
    const intoleranceDocs = await Intolerance.find({
      _id: { $in: intolerance },
    });
    const tagDocs = await Tag.find({ _id: { $in: tags } });

    const newRecipe = new Recipe({
      title,
      instructions,
      cuisine: cuisineDoc._id,
      diet: dietDocs.map((d) => d._id),
      intolerance: intoleranceDocs.map((i) => i._id),
      prepTime,
      caloriesPerServing,
      ingredients: ingredientDocs,
      tags: tagDocs.map((t) => t._id),
      servingSize,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
