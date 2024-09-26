const FoodModel = require("../Model/FoodModel");
const fs = require("fs");

const RemoveFoodItem = async (req, res) => {
  try {
    // Find the food item by its ID
    const food = await FoodModel.findById(req.body.id);
    console.log(food)

    // Check if the food item exists
    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
        success: false,
      });
    }

    // If the food item has an image, attempt to delete the image file
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.error("Failed to delete the image file:", err);
        }
      });
    }

    // Delete the food item from the database
    await FoodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
      message: "Food item removed successfully",
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      success: false,
    });
  }
};

module.exports = RemoveFoodItem;
