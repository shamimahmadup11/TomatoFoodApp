import { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import AddItems from "../AddItems/AddItems";
import ListItems from "../ListItems/ListItems";
import OrderItems from "../OrderItems/OrderItems";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("add");
 const url="http://localhost:4000"
  // Render  component 
  const renderComponent = () => {
    switch (activeComponent) {
      case "add":
        return <AddItems url={url} />;
      case "list":
        return <ListItems url={url} />;
      case "order":
        return <OrderItems url={url} />;
      default:
        return <AddItems url={url} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar with right border */}
      <div className="w-full md:w-1/4  bg-white h-auto md:h-screen p-4 border-b md:border-r border-gray-900">
        <div
          className="sidebar-item cursor-pointer flex justify-end items-center p-2 hover:bg-gray-100 border"
          onClick={() => setActiveComponent("add")}
        >
             <img className="h-6 w-6" src={assets.add_icon} alt="Add Icon" />
          <label className="ml-2 ">Add Items</label>
         
        </div>

        <div
          className="sidebar-item cursor-pointer flex justify-end items-center p-2 hover:bg-gray-100 border mt-2 mb-2"
          onClick={() => setActiveComponent("list")}
        >
             <img className="h-6 w-6" src={assets.order_icon} alt="List Icon" />
          <label className="ml-2">List Items</label>
        
        </div>

        <div
          className="sidebar-item cursor-pointer flex justify-end items-center p-2 hover:bg-gray-100 border"
          onClick={() => setActiveComponent("order")}
        >
                <img className="h-6 w-6" src={assets.order_icon} alt="Order Icon" />
          <label className="ml-2">Order Items</label>
      
        </div>
      </div>

      {/* Main content (right side) */}
      <div className="w-full md:w-3/4 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Sidebar;
