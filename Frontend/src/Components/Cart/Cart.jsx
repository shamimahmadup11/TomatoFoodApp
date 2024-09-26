import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../CreateContext/ContextStore";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, removeFromCart, food_list, setgettotalCartAmount, url, token } = useContext(StoreContext);
  
  // Convert cartItems object to array using Object.keys
  const cartItemIds = Object.keys(cartItems);
  const navigate=useNavigate()
  // Filter food_list to show only items that are in the cart
  const filteredItems = food_list.filter(item => cartItemIds.includes(item._id));

  const removeData = (id) => {
    removeFromCart(id);
  };

  // State to store subtotal, total, and delivery fee
  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = 5.99; // Example delivery fee
  const total = subtotal + deliveryFee;

  // Calculate Subtotal using useEffect to update whenever cartItems or filteredItems changes
  useEffect(() => {
    // console.log("cartItems:", cartItems);
    // console.log("filteredItems:", filteredItems);
    if(!token){

      navigate("/")
      toast("Please login to access cart")
    }

    const newSubtotal = filteredItems.reduce(
      (acc, item) => acc + (item.price || 0) * (cartItems[item._id] || 1),
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItems, filteredItems , token]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Side - Cart Items */}
      <div className="col-span-2">
        {/* Cart Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 font-bold mb-4 text-gray-700 border-b pb-2 text-center md:text-left">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {/* Cart Items */}
        <div>
          {filteredItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
          ) : (
            filteredItems.map((item) => (
              cartItems[item._id]>0 && (
                <div
                  key={item._id}
                  className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border-b py-4"
                >
                  {/* Item Image */}
                  <div className="flex justify-center md:justify-start md:col-span-1 mb-4 md:mb-0">
                    <img
                      src={`${url}/image/${item.image}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded shadow-sm"
                    />
                  </div>

                  {/* Title */}
                  <p className="hidden md:block text-lg text-gray-800 md:col-span-1">
                    {item.name}
                  </p>

                  {/* Price */}
                  <p className="text-gray-600 md:col-span-1">
                    ${item.price?.toFixed(2) || "0.00"}
                  </p>

                  {/* Quantity */}
                  <p className="text-gray-600 md:col-span-1">
                    {cartItems[item._id]}
                  </p>

                  {/* Total */}
                  <p className="text-gray-800 font-semibold md:col-span-1">
                    ${(item.price * (cartItems[item._id] || 1)).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeData(item._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 md:col-span-1"
                  >
                    Remove
                  </button>
                </div>
              )
            ))
          )}
        </div>

        {/* Horizontal line after items */}
        {filteredItems.length > 0 && <hr className="mt-4" />}
      </div>

      {/* Right Side - Cart Summary and Promo Code */}
      <div className="border p-4 rounded-lg h-[350px]">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Cart Total</h2>
        <div className="mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Delivery Fee:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-800 font-bold mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          to="/placeOrder"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 p-2"
          onClick={() => {
            setgettotalCartAmount(`${total.toFixed(2)}`);
          }}
        >
          Proceed to Checkout
        </Link>
        <hr className="my-4" />
        <div className="mt-4">
          <input
            type="text"
            placeholder="If you have a code, enter it here"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
          />
          <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition duration-300">
            Apply Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
