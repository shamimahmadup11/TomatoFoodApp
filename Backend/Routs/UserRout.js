const express=require("express");
const UserController = require("../Controller/UserController");
const userRout=express.Router();
userRout.post("/login" , UserController.login)
userRout.post("/register" , UserController.register)

module.exports=userRout