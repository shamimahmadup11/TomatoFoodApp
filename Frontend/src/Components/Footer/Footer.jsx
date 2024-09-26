import React from "react";
import logo from "../../assets/admin_assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          {/* Logo and Tagline */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} alt="Taotao Logo" className="w-16 h-16 mr-3" />
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-end">
            <div className="mx-4">
              <h4 className="font-bold mb-2">Quick Links</h4>
              <ul>
                <li className="mb-1"><a href="#" className="hover:underline">Home</a></li>
                <li className="mb-1"><a href="#" className="hover:underline">Menu</a></li>
                <li className="mb-1"><a href="#" className="hover:underline">About Us</a></li>
                <li className="mb-1"><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            {/* Social Media */}
            <div className="mx-4">
              <h4 className="font-bold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-500">Twitter</a>
                <a href="#" className="hover:text-pink-500">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; 2024 Taotao. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
