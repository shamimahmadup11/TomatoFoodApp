import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/admin_assets/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItems = () => {
  const url = "http://localhost:4000";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null, // Use `null` for initial state of file
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file // Store the file object directly
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      // Prepare form data for submission
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) {
        data.append("image", formData.image);
      }

      // POST request to the backend
      const response = await axios.post(`${url}/AddFood`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form submitted with data:", response.data);
      if (response.data.success === true) {
        toast.success("Product added successfully!");
      } else {
        toast.error("Failed to add product.");
      }

      // Clear the form after submission
      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
        category: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700">Product Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-none w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Product Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-none w-full h-40"
              required
            ></textarea>
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Product Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-none w-full"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700">Product Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-none w-full"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Product Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 p-2 rounded-none w-full"
              required
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
            {!formData.image && (
              <img
                src={assets.upload_area}
                alt="Upload Icon"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white p-2 rounded-none w-full"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
