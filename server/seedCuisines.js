const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Cuisine = require("./models/Cuisine");

dotenv.config();

const cuisines = [
  { name: "Italian" },
  { name: "Chinese" },
  { name: "Mexican" },
  { name: "Indian" },
  { name: "French" },
  { name: "Japanese" },
  { name: "Greek" },
  { name: "Spanish" },
  { name: "Thai" },
  { name: "Moroccan" },
  { name: "Turkish" },
  { name: "Vietnamese" },
  { name: "Korean" },
  { name: "Brazilian" },
  { name: "Cuban" },
  { name: "Ethiopian" },
  { name: "Lebanese" },
  { name: "Mediterranean" },
  { name: "Caribbean" },
  { name: "Peruvian" },
  { name: "Argentinian" },
  { name: "Russian" },
  { name: "German" },
  { name: "Polish" },
  { name: "Hungarian" },
  { name: "Swedish" },
  { name: "Norwegian" },
  { name: "Danish" },
  { name: "Finnish" },
  { name: "Dutch" },
  { name: "Belgian" },
  { name: "Swiss" },
  { name: "Austrian" },
  { name: "Portuguese" },
  { name: "Filipino" },
  { name: "Indonesian" },
  { name: "Malaysian" },
  { name: "Singaporean" },
  { name: "Pakistani" },
  { name: "Sri Lankan" },
  { name: "Burmese" },
  { name: "Nepalese" },
  { name: "Tibetan" },
  { name: "Bangladeshi" },
  { name: "Afghan" },
  { name: "Iranian" },
  { name: "Iraqi" },
  { name: "Syrian" },
  { name: "Jordanian" },
  { name: "Israeli" },
  { name: "Palestinian" },
  { name: "Saudi" },
  { name: "Yemeni" },
  { name: "Omani" },
  { name: "Qatari" },
  { name: "Emirati" },
  { name: "Kuwaiti" },
  { name: "Bahraini" },
  { name: "Sudanese" },
  { name: "South African" },
  { name: "Nigerian" },
  { name: "Ghanaian" },
  { name: "Kenyan" },
  { name: "Tanzanian" },
  { name: "Ugandan" },
  { name: "Zimbabwean" },
  { name: "Malawian" },
  { name: "Zambian" },
  { name: "Congolese" },
  { name: "Ivory Coast" },
  { name: "Senegalese" },
  { name: "Cameroonian" },
  { name: "Angolan" },
  { name: "Mozambican" },
  { name: "Namibian" },
  { name: "Botswanan" },
  { name: "Eritrean" },
  { name: "Somali" },
  { name: "Libyan" },
  { name: "Tunisian" },
  { name: "Algerian" },
  { name: "Egyptian" },
  { name: "Mauritian" },
  { name: "Madagascan" },
  { name: "Papua New Guinean" },
  { name: "Fijian" },
  { name: "Tongan" },
  { name: "Samoan" },
  { name: "New Zealand" },
  { name: "Australian" },
  { name: "Hawaiian" },
  { name: "Venezuelan" },
  { name: "Fusion" },
  { name: "Arab" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return Cuisine.insertMany(cuisines);
  })
  .then(() => {
    console.log("Cuisines inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting cuisines:", error);
    mongoose.connection.close();
  });
