const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ingredient = require("./models/Ingredient");

dotenv.config();

const ingredients = [
  { name: "Salt" },
  { name: "Pepper" },
  { name: "Olive Oil" },
  { name: "Garlic" },
  { name: "Onion" },
  { name: "Tomato" },
  { name: "Chicken" },
  { name: "Beef" },
  { name: "Pork" },
  { name: "Carrot" },
  { name: "Potato" },
  { name: "Basil" },
  { name: "Oregano" },
  { name: "Thyme" },
  { name: "Rosemary" },
  { name: "Parsley" },
  { name: "Cilantro" },
  { name: "Ginger" },
  { name: "Lemon" },
  { name: "Lime" },
  { name: "Vinegar" },
  { name: "Soy Sauce" },
  { name: "Sugar" },
  { name: "Brown Sugar" },
  { name: "Honey" },
  { name: "Butter" },
  { name: "Flour" },
  { name: "Baking Powder" },
  { name: "Baking Soda" },
  { name: "Eggs" },
  { name: "Milk" },
  { name: "Cheese" },
  { name: "Yogurt" },
  { name: "Cream" },
  { name: "Broccoli" },
  { name: "Cauliflower" },
  { name: "Spinach" },
  { name: "Kale" },
  { name: "Cabbage" },
  { name: "Lettuce" },
  { name: "Celery" },
  { name: "Bell Pepper" },
  { name: "Zucchini" },
  { name: "Cucumber" },
  { name: "Mushroom" },
  { name: "Green Beans" },
  { name: "Peas" },
  { name: "Corn" },
  { name: "Rice" },
  { name: "Pasta" },
  { name: "Bread" },
  { name: "Tortilla" },
  { name: "Avocado" },
  { name: "Apple" },
  { name: "Banana" },
  { name: "Orange" },
  { name: "Strawberry" },
  { name: "Blueberry" },
  { name: "Raspberry" },
  { name: "Pineapple" },
  { name: "Mango" },
  { name: "Grapes" },
  { name: "Watermelon" },
  { name: "Melon" },
  { name: "Peach" },
  { name: "Plum" },
  { name: "Cherry" },
  { name: "Fig" },
  { name: "Pomegranate" },
  { name: "Almonds" },
  { name: "Walnuts" },
  { name: "Cashews" },
  { name: "Peanuts" },
  { name: "Hazelnuts" },
  { name: "Pistachios" },
  { name: "Sunflower Seeds" },
  { name: "Pumpkin Seeds" },
  { name: "Sesame Seeds" },
  { name: "Chia Seeds" },
  { name: "Flax Seeds" },
  { name: "Oats" },
  { name: "Quinoa" },
  { name: "Lentils" },
  { name: "Chickpeas" },
  { name: "Black Beans" },
  { name: "Kidney Beans" },
  { name: "White Beans" },
  { name: "Tofu" },
  { name: "Tempeh" },
  { name: "Fish" },
  { name: "Shrimp" },
  { name: "Crab" },
  { name: "Lobster" },
  { name: "Clams" },
  { name: "Mussels" },
  { name: "Squid" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return Ingredient.insertMany(ingredients);
  })
  .then(() => {
    console.log("Ingredients inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting ingredients:", error);
    mongoose.connection.close();
  });
