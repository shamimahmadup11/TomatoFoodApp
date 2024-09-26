import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../CreateContext/ContextStore";
import StarRating from "../FoodDisplay/StarRating";

const SowMenuItems = () => {
  const { category, food_list, addToCart, removeFromCart, cartItems } = useContext(StoreContext);

  // State to manage quantities of food items
  const [quantities, setQuantities] = useState({});

  // Effect to synchronize quantities with cart state
  useEffect(() => {
    const quantitiesMap = {};
    cartItems.forEach((item) => {
      quantitiesMap[item._id] = item.quantity;
    });
    setQuantities(quantitiesMap);
  }, [cartItems]);

  // Filter the food list based on the selected category
  const filteredFoodList = food_list.filter(item => {
    if (!category) return true;
    return item.category === category;
  });

  // Function to handle incrementing the quantity
  const handleIncrement = (food) => {
    addToCart(food);

    // Update quantities state for local display
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [food._id]: (prevQuantities[food._id] || 0) + 1,
    }));

    // Log updated cart item quantities
    console.log("Cart items after increment:", cartItems);
  };

  // Function to handle decrementing the quantity
  const handleDecrement = (food) => {
    if (quantities[food._id] > 1) {
      removeFromCart(food._id);

      // Update quantities state for local display
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [food._id]: Math.max((prevQuantities[food._id] || 0) - 1, 0),
      }));
    } else if (quantities[food._id] === 1) {
      removeFromCart(food._id);

      // Remove item from local quantities state
      setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[food._id];
        return updatedQuantities;
      });
    }

    // Log updated cart item quantities
    console.log("Cart items after decrement:", cartItems);
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {category ? `Category: ${category}` : "All Menu Items"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoodList.map((item) => (
          <div key={item._id} className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {/* Quantity Control Overlay */}
              <div className={`absolute bottom-4 right-4 flex items-center space-x-2 ${quantities[item._id] > 0 ? 'bg-white bg-opacity-70' : ''} rounded-full p-1`}>
                {quantities[item._id] > 0 && (
                  <>
                    <button
                      className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="text-gray-800 px-2">{quantities[item._id]}</span>
                  </>
                )}
                <button
                  className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            {/* Star Rating */}
            <div className="mb-2">
              <StarRating rating={item.rating} />
            </div>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-yellow-500 font-bold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SowMenuItems;
