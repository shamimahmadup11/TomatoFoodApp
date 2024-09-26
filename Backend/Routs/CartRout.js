const express=require("express")
const cartRouter=express.Router()
const cartController=require("../Controller/CartController")
const authMiddleware=require("../middleware/authMiddleware")

cartRouter.post("/addTocart" , authMiddleware ,cartController.addCartData)
cartRouter.post("/removeCart" , authMiddleware ,cartController.removeCart)
cartRouter.post("/getCart" , authMiddleware ,cartController.getCartData)

module.exports=cartRouter