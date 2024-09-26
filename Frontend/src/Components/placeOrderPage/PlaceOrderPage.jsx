

import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../CreateContext/ContextStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrderPage = () => {
  const { gettotalCartAmount, food_list, cartItems, token, url } = useContext(StoreContext);
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  useEffect(()=>{
if(!token){

  navigate("/")
  toast("please Login first")
}
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a copy to avoid mutating the original item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      return;  // Exit the function if there are no items in the cart
    }

    let orderData = {
      address: formData,
      items: orderItems,
      amount:10, // Adjust this as needed
    };

    console.log("Order Data:", orderData); // Log to inspect order data
    console.log("Token:", token); // Log to check if token is present

    try {
      let response = await axios.post(url + "/placeOrder", orderData , {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message); // More detailed error message
      }
    } catch (error) {
      console.error("Error placing order:", error); // Log the error to the console
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
      {/* Left Side - Form */}
      <div className="flex-1 lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields */}
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Street", name: "street", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Zip Code", name: "zipCode", type: "text" },
            { label: "Country", name: "country", type: "text" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor={name}
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Right Side - Order Summary */}
      <div className="lg:w-1/3 h-[300px] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal:</span>
          <span>{gettotalCartAmount}</span> {/* Example subtotal */}
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Delivery Fee:</span>
          <span>$10.00</span> {/* Example delivery fee */}
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-sm mb-4">
          <span>Total:</span>
          <span>${gettotalCartAmount + 10}</span> {/* Example total */}
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderPage;

