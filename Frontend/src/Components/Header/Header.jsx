import { assets } from "../../assets/frontend_assets/assets";

const Header = () => {
  return (
    <div
      className="relative bg-cover bg-center h-96 flex items-center text-left mx-4 md:mx-8 lg:mx-16 mt-4 md:mt-8 lg:mt-12 rounded-xl overflow-hidden"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Content */}
      <div className="relative z-10 text-white max-w-xl px-4 md:px-8 lg:px-12 animate-slide-down">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Order your favorite food here</h1>
        <p className="text-lg md:text-xl mb-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga pariatur, suscipit dolorum sit laborum, ullam culpa, neque obcaecati odit eaque cupiditate fugit.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
