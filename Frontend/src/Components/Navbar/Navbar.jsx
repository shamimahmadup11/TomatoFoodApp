import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/admin_assets/logo.png";
import searchIcon from "../../assets/frontend_assets/search_icon.png";
import bagIcon from "../../assets/frontend_assets/bag_icon.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../../CreateContext/ContextStore";
import { assets } from "../../assets/frontend_assets/assets";
import { IoLogOut } from "react-icons/io5";


const Navbar = ({ setLoginpopup }) => {
  const [menu, setMenu] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const isActive = (item) => menu === item;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="border-b py-2 px-4 md:px-8 sticky top-0 z-50 bg-white">
      <ToastContainer />
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="w-24 md:w-32" />
        </Link>

        {/* Desktop navigation menu */}
        <div className="hidden md:flex md:flex-grow md:justify-center">
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li className="flex gap-6">
              <Link
                to="/"
                onClick={() => setMenu("Home")}
                className={`hover:text-blue-500 cursor-pointer ${
                  isActive("Home") ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                onClick={() => setMenu("Menu")}
                className={`hover:text-blue-500 cursor-pointer ${
                  isActive("Menu") ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Menu
              </Link>
              <Link
                to="/mobileApp"
                onClick={() => setMenu("Mobile")}
                className={`hover:text-blue-500 cursor-pointer ${
                  isActive("Mobile") ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Mobile App
              </Link>
              <Link
                to="/contact-us"
                onClick={() => setMenu("Contact Us")}
                className={`hover:text-blue-500 cursor-pointer ${
                  isActive("Contact Us") ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side icons and Sign In button */}
        <div className="flex items-center gap-4 relative">
          <img
            src={searchIcon}
            alt="Search"
            className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
          />
          <Link to="/cart">
            <img
              src={bagIcon}
              alt="Bag"
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
            />
          </Link>

          {/* Sign In button to toggle the login popup */}
          {!token ? (
            <button
              className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition"
              onClick={() => setLoginpopup(true)}
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-2 relative">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <Link
                    to="/myOrders"
                    className="flex gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <img  src={assets.bag_icon} alt="Orders" className="h-6 w-6" />
                    <span>Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <span><IoLogOut className=" h-8 w-8"/></span> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div className="flex md:hidden mt-2 justify-center">
        <ul className="flex gap-4 text-gray-700 font-medium">
          <li className="flex gap-4">
            <Link
              to="/"
              onClick={() => setMenu("Home")}
              className={`hover:text-blue-500 cursor-pointer ${
                isActive("Home") ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMenu("Menu")}
              className={`hover:text-blue-500 cursor-pointer ${
                isActive("Menu") ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Menu
            </Link>
            <Link
              to="/mobile"
              onClick={() => setMenu("Mobile")}
              className={`hover:text-blue-500 cursor-pointer ${
                isActive("Mobile") ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Mobile App
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMenu("Contact Us")}
              className={`hover:text-blue-500 cursor-pointer ${
                isActive("Contact Us") ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
