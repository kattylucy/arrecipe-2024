const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Intolerance = require("./models/Intolerance");

dotenv.config();

const intolerances = [
  { name: "Gluten" },
  { name: "Lactose" },
  { name: "Peanuts" },
  { name: "Tree Nuts" },
  { name: "Eggs" },
  { name: "Fish" },
  { name: "Shellfish" },
  { name: "Soy" },
  { name: "Wheat" },
  { name: "Sesame" },
  { name: "Sulfites" },
  { name: "Mustard" },
  { name: "Celery" },
  { name: "Mollusks" },
  { name: "Corn" },
  { name: "Legumes" },
  { name: "Yeast" },
  { name: "Citrus" },
  { name: "Red Meat" },
  { name: "Poultry" },
  { name: "Fruits" },
  { name: "Vegetables" },
  { name: "Dairy" },
  { name: "Spices" },
  { name: "Herbs" },
  { name: "Alcohol" },
  { name: "Caffeine" },
  { name: "Nightshades" },
  { name: "Histamines" },
  { name: "FODMAPs" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return Intolerance.insertMany(intolerances);
  })
  .then(() => {
    console.log("Intolerances inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting intolerances:", error);
    mongoose.connection.close();
  });
