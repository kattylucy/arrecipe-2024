const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Diet = require("./models/Diet");

dotenv.config();

const diets = [
  { name: "Vegan" },
  { name: "Vegetarian" },
  { name: "Pescatarian" },
  { name: "Keto" },
  { name: "Paleo" },
  { name: "Low Carb" },
  { name: "Gluten-Free" },
  { name: "Dairy-Free" },
  { name: "Whole30" },
  { name: "Mediterranean" },
  { name: "Atkins" },
  { name: "South Beach" },
  { name: "Zone" },
  { name: "DASH" },
  { name: "Flexitarian" },
  { name: "Plant-Based" },
  { name: "Intermittent Fasting" },
  { name: "Raw Food" },
  { name: "Low Fat" },
  { name: "High Protein" },
  { name: "Blood Type" },
  { name: "Anti-Inflammatory" },
  { name: "Carnivore" },
  { name: "Macrobiotic" },
  { name: "FODMAP" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return Diet.insertMany(diets);
  })
  .then(() => {
    console.log("Diets inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting diets:", error);
    mongoose.connection.close();
  });
