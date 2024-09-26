

import { useContext } from "react";
import StarRating from "./StarRating";
import { StoreContext } from "../../CreateContext/ContextStore";

const FoodDisplay = () => {
  const { food_list, addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Top Dishes for You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {food_list.map((food) => {
          const quantity = cartItems[food._id] || 0; // Get quantity from cartItems

          return (
            <div key={food._id} className="relative border p-4 rounded-lg shadow-lg text-center">
              <div className="relative">
                <img
                  src={`${url}/image/${food.image}`}
                  alt={food.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                {/* Quantity Control Overlay */}
                <div className={`absolute bottom-4 right-4 flex items-center space-x-2 ${quantity > 0 ? 'bg-white bg-opacity-70' : ''} rounded-full p-1`}>
                  {quantity > 0 && (
                    <>
                      <button
                        className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={() => removeFromCart(food._id)}
                      >
                        -
                      </button>
                      <span className="text-gray-800 px-2">{quantity}</span>
                    </>
                  )}
                  <button
                    className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={() => addToCart(food._id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-bold mb-2">{food.name}</h2>
              {/* Star Rating */}
              <div className="mb-2">
                <StarRating rating={food.rating} />
              </div>
              <p className="text-gray-700 mb-2">{food.description}</p>
              <p className="text-blue-600 font-semibold mb-2">${food.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
