import { useContext, useState } from "react";
import { menu_list } from "../../assets/frontend_assets/assets";
import "./explourmenu.css";
import { StoreContext } from "../../CreateContext/ContextStore";
import { Link } from "react-router-dom";

const ExplourMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { setCategory } = useContext(StoreContext);

  // Function to handle item click and update category
  const handleItemClick = (index, menuName) => {
    setSelectedItem(index); // Update the selected item index
    setCategory(menuName); // Update category in the context
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Explore Menu</h1>
      <p className="text-center m-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, sequi quasi. Sunt dicta, reprehenderit facere deleniti in.
      </p>
      <div className="flex justify-center">
        {/* Scroll container with hidden scrollbar */}
        <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
          {menu_list.map((item, index) => (
            <Link to="/menuItems"
              key={index}
              className="flex-shrink-0 text-center cursor-pointer"
              onClick={() => handleItemClick(index, item.menu_name)} // Handle click event
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-26 h-26 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full object-cover border-2 ${
                  selectedItem === index ? "border-yellow-500" : "border-transparent"
                }`} // Conditional border color
              />
              <p className="mt-2 text-sm md:text-base font-medium text-gray-700">{item.menu_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplourMenu;
