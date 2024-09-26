
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AddFood = require("../Controller/AddFood");
const FoodList=require("../Controller/ListFoodItem")
const RemoveFoodItem=require("../Controller/RemoveFoodItem")
// destination for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Correctly define the path to your uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer instance 
const upload = multer({ storage: storage });
router.post("/AddFood", upload.single("image"), AddFood);
router.get("/foodList" ,FoodList )
router.post("/RemoveItem" ,RemoveFoodItem)

module.exports = router;
