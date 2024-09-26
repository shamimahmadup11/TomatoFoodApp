import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../CreateContext/ContextStore";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/userOrders", {}, { headers: { token } });

      // Check if the response is successful
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (err) {
      setError(err.message);
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {data.length > 0 ? (
        <ul className="space-y-6">
          {data.map((order) => (
            <div key={order._id} className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-4">
              {/* Parcel Icon */}
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12 h-12 mb-4 md:mb-0 md:mr-6" />

              {/* Order Info */}
              <div className="flex-1">
                <p className="text-gray-700 font-semibold mb-2">
                  Items:{" "}
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-gray-700 mb-2">Total Amount: ${order.amount}</p>
                <p className="text-gray-700 mb-2">Total Items: {order.items.length}</p>

                {/* Order Status with Dot */}
                <div className="flex items-center">
                  <p className="text-gray-700">Order Status: {order.status}</p>
                  <div
                    className={`ml-3 w-3 h-3 rounded-full ${
                      order.status === "processing" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Track Order Button */}
              <div className="mt-4 md:mt-0">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No orders found</p>
      )}
    </div>
  );
};

export default MyOrders;
