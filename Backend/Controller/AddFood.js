const FoodModel = require("../Model/FoodModel");

// Controller to handle adding food
const AddFood = async (req, res) => {
    try {
       
        const { name, description, price, category } = req.body;

        // Check if all fields and file are provided
        if (!name || !description || !price || !category || !req.file) {
            return res.status(400).json({
                message: "All fields are required, including the image.",
                success: false,
                error: true
            });
        }

        // Construct the image file name
        const image_filename = req.file.filename;

        // Create a new food item
        const food = new FoodModel({
            name,
            description,
            price,
            category,
            image: image_filename
        });

        // Save the food item to the database
        const result = await food.save();

        // Return success response
        res.status(201).json({
            message: "Food Added Successfully",
            success: true,
            error: false,
            data: result
        });
    } catch (error) {
        // Handle validation and other errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation Error",
                success: false,
                error: error.errors // Return the detailed validation errors
            });
        }

        // Handle other unexpected errors
        res.status(500).json({
            message: "Failed to Add Food",
            success: false,
            error: error.message
        });
    }
};

module.exports = AddFood;
