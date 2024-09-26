import axios from "axios";
import { useEffect, useState } from "react";

const OrderItems = ({ url }) => {
  const [orderItems, setOrderItems] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/listOrder`);
      setOrderItems(response.data.data); // Use 'response.data.data' to get the array of items
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Call the API to update the order status
      await axios.put(`${url}/updateOrderStatus`, {
        orderId,
        status: newStatus,
      });

      // Update the local state with the new status
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item._id === orderId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders(); // Fetch orders when component mounts
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Items</h1>
      <div className="space-y-6">
        {orderItems.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row md:items-center gap-10"
          >
            {/* Order Info */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-700 mb-1">Total Amount: ${order.amount}</p>
              <p className="text-gray-700 mb-1">
                Payment Status: {order.payment ? "Paid" : "Pending"}
              </p>
              <p className="text-gray-700 mb-1">
                Date: {new Date(order.date).toLocaleString()}
              </p>
            </div>

            {/* Shipping Address */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0 ml-2">
              <h4 className="font-medium text-gray-900">Shipping Address:</h4>
              <p className="text-gray-600">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <p className="text-gray-600">{order.address.email}</p>
              <p className="text-gray-600">{`${order.address.street}, ${order.address.state}, ${order.address.zipCode}, ${order.address.country}`}</p>
              <p className="text-gray-600">Phone: {order.address.phoneNumber}</p>
            </div>

            {/* Items Ordered */}
            <div className="w-full md:w-1/2">
              {order.items.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900">Items Ordered:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.name} - ${item.price} (Quantity: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Order Status - Dropdown for changing status */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h4 className="font-medium text-gray-900">Order Status:</h4>
              <select
                className="mt-2 p-2 border border-gray-300 rounded-lg"
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Processing">Order Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
