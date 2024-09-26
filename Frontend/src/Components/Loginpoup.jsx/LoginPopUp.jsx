import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../CreateContext/ContextStore";
import axios from "axios";
import { toast } from "react-toastify";


const LoginPopUp = ({ setLoginpopup }) => {
  const [currentState, setCurrentState] = useState(true); // true for signup, false for login
  const { url, token, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
console.log(data)
const onLogin = async (e) => {
  e.preventDefault();
  
  let newUrl = currentState ? `${url}/register` : `${url}/login`;
  console.log(newUrl);
  console.log(data); // Log the data being sent

  try {
    const response = await axios.post(newUrl, data);
    console.log(response.data);

    if (response.data.success) {
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);
      // Set token in context
      setToken(token);
      // Show success toast
      toast.success(currentState ? "Account created successfully!" : "Logged in successfully!");

      // Optionally, you can close the login/signup popup after success
      setTimeout(() => {
        setLoginpopup(false);
      }, 2000);
    } else {
      toast.error(response.data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error occurred during the API request:", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative mx-4">
        {/* <ToastContainer className=" z-50 " /> */}

        {/* Header text */}
        {currentState ? (
          <h1 className="text-2xl font-bold mb-4 text-center">Sign up</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        )}

        {/* Close icon */}
        <img
          src={assets.cross_icon}
          alt="Close"
          onClick={() => setLoginpopup(false)}
          className="absolute top-4 right-4 cursor-pointer w-6 h-6"
        />

        {/* Form content */}
        <form onSubmit={onLogin} className="flex flex-col space-y-4">
          {currentState && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter Your Full Name"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Enter Your Email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Enter Your Password"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
          />

          {/* Buttons */}
          {currentState ? (
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            >
              Create Account
            </button>
          ) : (
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          )}

          {/* Switch between login and signup */}
          <div className="text-center mt-4">
            {currentState ? (
              <>
                <p>Already have an account?</p>
                <span
                  onClick={() => setCurrentState(false)} // Switch to login state
                  className="text-yellow-500 cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </>
            ) : (
              <>
                <p>Don't have an account?</p>
                <span
                  onClick={() => setCurrentState(true)} // Switch to signup state
                  className="text-yellow-500 cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;
