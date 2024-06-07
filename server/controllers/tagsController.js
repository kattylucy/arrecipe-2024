const Tags = require("../models/Tag");

const getAllTags = async (req, res) => {
  try {
    const tag = await Tags.find();
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTags,
};
