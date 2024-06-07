const Diet = require("../models/Diet");

const getAllDiet = async (req, res) => {
  try {
    const query = req.query;

    const diet = await Diet.find({
      name: { $regex: `^${query.name}` },
    });
    res.status(200).json(diet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDiet,
};
