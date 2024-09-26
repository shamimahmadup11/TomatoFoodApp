const mongoose = require("mongoose");

// Define the Food schema
const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

// Create the model based on the schema
const FoodModel = mongoose.model("Food", FoodSchema); // Use the schema object here, not a string

module.exports = FoodModel;
