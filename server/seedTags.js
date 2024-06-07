const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tag = require("./models/Tag");

dotenv.config();

const tags = [
  { name: "easy-meal" },
  { name: "quick" },
  { name: "cheap" },
  { name: "low-calories" },
  { name: "high-protein" },
  { name: "vegetarian" },
  { name: "vegan" },
  { name: "gluten-free" },
  { name: "dairy-free" },
  { name: "keto" },
  { name: "paleo" },
  { name: "whole30" },
  { name: "healthy" },
  { name: "comfort-food" },
  { name: "spicy" },
  { name: "low-carb" },
  { name: "low-fat" },
  { name: "high-fiber" },
  { name: "breakfast" },
  { name: "lunch" },
  { name: "dinner" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return Tag.insertMany(tags);
  })
  .then(() => {
    console.log("Tags inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting tags:", error);
    mongoose.connection.close();
  });
