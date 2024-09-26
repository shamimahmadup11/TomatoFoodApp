// ContextStore.js
import { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets"; // Adjust the path as necessary
import axios from "axios";
export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [category, setCategory] = useState(null);
  const [gettotalCartAmount, setgettotalCartAmount] = useState(null);
  const url = "https://tomatofoodapp.onrender.com" ;
  const [token, setToken] = useState();
  const [food_list, setFood_list] = useState([]);

  const FetchFoodList = async () => {
    const response = await axios.get(`${url}/foodList`);
    // console.log(response.data.data);
    setFood_list(response.data.data);
  };

  const getCartData = async (token) => {
    const response = await axios.post(
      url + "/getCart",
      {},
      { headers: { token } }
    );
    console.log(response.data.data);
    setCartItems(response.data.data);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    FetchFoodList();
    getCartData(token);
    
  }, []);

  useEffect(() => {
    console.log("Selected Category:", category);
    console.log("Total Cart Amount:", gettotalCartAmount);
  }, [category, gettotalCartAmount]); // Add gettotalCartAmount to dependency array

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/addTocart", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/removeCart", { itemId }, { headers: { token } });
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    category,
    setCategory,
    gettotalCartAmount, // Include this in the context
    setgettotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
