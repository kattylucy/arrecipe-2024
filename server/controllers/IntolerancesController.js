const Intolerance = require("../models/Intolerance");

const getAllIntolerances = async (req, res) => {
  try {
    const query = req.query;

    const intolerance = await Intolerance.find({
      name: { $regex: `^${query.name}` },
    });
    res.status(200).json(intolerance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllIntolerances,
};
