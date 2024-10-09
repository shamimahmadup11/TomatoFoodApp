import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../CreateContext/ContextStore';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyOrder = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/verifyOrders`, { success, orderId });
      console.log(response);
      if (response.data.success) {
        toast.success("Order successful!");
        navigate("/");
      } else {
        navigate("/");
        toast.error("Failed to verify order.");
      }
    } catch (error) {
      console.error("Error during payment verification", error);
      toast.error("An error occurred while verifying payment.");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
    console.log(url, success, orderId);
  }, []); // Empty array ensures it runs only once after mount.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full max-w-md">
        {success === 'true' ? (
          <div className="text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">Your order <span className="font-semibold">#{orderId}</span> has been placed successfully.</p>
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="text-center">
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Order Failed!</h1>
            <p className="text-gray-600 mb-6">We couldn’t process your order <span className="font-semibold">#{orderId}</span>. Please try again.</p>
            <button 
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
              onClick={() => navigate("/")}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOrder;
