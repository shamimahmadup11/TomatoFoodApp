import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListItems = () => {
  const url = "http://localhost:4000";
  const [items, setItems] = useState([]); // State to store the fetched items
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  // Function to fetch the data
  const fetchDataList = async () => {
    try {
      const response = await axios.get(`${url}/foodList`);
      setItems(response.data.data); // Use 'response.data.data' to get the array of items
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Loading finished
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchDataList();
  }, []);

  // Handle product removal (example action)
  const handleRemove = async (id) => {
    try {
      const response = await axios.post(`${url}/removeItem`, { id });
      console.log(response);

      // Update the items list by removing the deleted item
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      if (response.data.success === true) {
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Items</h1>

      {/* Loading State */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Displaying Items in Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 text-left border-b border-gray-200">Image</th>
                <th className="p-3 text-left border-b border-gray-200">Name</th>
                <th className="p-3 text-left border-b border-gray-200">Category</th>
                <th className="p-3 text-left border-b border-gray-200">Price</th>
                <th className="p-3 text-left border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {/* Image Column */}
                    <td className="p-3">
                      <img
                        src={`${url}/image/${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>

                    {/* Name Column */}
                    <td className="p-3 font-semibold">
                      {item.name}
                    </td>

                    {/* Category Column */}
                    <td className="p-3">
                      {item.category || "N/A"}
                    </td>

                    {/* Price Column */}
                    <td className="p-3 text-green-500 font-bold">
                      ${item.price}
                    </td>

                    {/* Action Column (Cancel Button) */}
                    <td className="p-3">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-gray-500 text-center">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListItems;
