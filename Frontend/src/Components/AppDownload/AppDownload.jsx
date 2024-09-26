import { assets } from "../../assets/frontend_assets/assets";

const AppDownload = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-0">
        For a Better Experience, Download the Tomato App
      </h1>
      <div className="flex space-x-4">
        <img
          src={assets.app_store}
          alt="Download on the App Store"
          className="w-40 sm:w-48 md:w-56 lg:w-64 hover:scale-105 transition-transform duration-300 rounded-lg shadow-md cursor-pointer"
        />
        <img
          src={assets.play_store}
          alt="Get it on Google Play"
          className="w-40 sm:w-48 md:w-56 lg:w-64 hover:scale-105 transition-transform duration-300 rounded-lg shadow-md cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AppDownload;
