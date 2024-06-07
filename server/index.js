const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const dietRoute = require("./routes/diet");
const recipesRoute = require("./routes/recipe");
const ingredientsRoute = require("./routes/ingredients");
const intolerancesRoute = require("./routes/intolerances");
const tagsRoute = require("./routes/tags");
const cuisineRoute = require("./routes/cuisine");

app.use("/api/recipes", recipesRoute);
app.use("/api/ingredients", ingredientsRoute);
app.use("/api/intolerances", intolerancesRoute);
app.use("/api/diets", dietRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/cuisine", cuisineRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
