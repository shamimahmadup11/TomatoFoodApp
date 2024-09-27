const OrderModel = require("../Model/OrderModel");
const UserModel = require("../Model/UserModel");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = new Stripe(process.env.SECRET_KEY_STRIP);

const placeOrder = async (req, res) => {
  const frontend_url = "https://tomato-food-app-ybij.vercel.app";

  try {
    const { userId, items, amount, address } = req.body;

    // Ensure that the necessary fields are provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required. ",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items are required.",
      });
    }

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required.",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required.",
      });
    }

    // Log the incoming data to verify everything is correct
    console.log("Order Data:", { userId, items, amount, address });

    // Create a new order
    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear the user's cart
    await UserModel.findByIdAndUpdate(userId, { cartdata: {} });

    // Create Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Price in paise
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // Delivery charge in paise (₹2)
      },
      quantity: 1,
    });

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Send the session URL to the frontend
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (e) {
    // Handle errors and return appropriate response
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const verifyOrders = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({
        success: true,
        message: "Paid",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.body.userId });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// all the order for the admin panel 

const adminOrdersList = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const orderController = {
  placeOrder,
  verifyOrders,
  userOrders,
  adminOrdersList
};

module.exports = orderController;
