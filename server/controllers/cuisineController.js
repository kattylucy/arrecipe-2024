const Cuisine = require("../models/Cuisine");

const getAllCuisine = async (req, res) => {
  try {
    const query = req.query;

    const cuisine = await Cuisine.find({
      name: { $regex: `^${query.name}` },
    });
    res.status(200).json(cuisine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCuisine,
};
