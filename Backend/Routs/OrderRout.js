const express=require("express")
const orderRout=express.Router();
const orderController=require("../Controller/OrderController")
const authMiddleware=require("../middleware/authMiddleware")

orderRout.post("/placeOrder" ,authMiddleware, orderController.placeOrder)
orderRout.post("/verifyOrders" ,  orderController.verifyOrders)
orderRout.post("/userOrders" ,authMiddleware, orderController.userOrders)
orderRout.get("/listOrder" , orderController.adminOrdersList)

module.exports=orderRout
