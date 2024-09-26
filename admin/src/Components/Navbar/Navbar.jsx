import { assets } from "../../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
        {/* Logo on the left side */}
        <div className="flex-shrink-0">
          <img className="h-12" src={assets.logo} alt="Logo" />
        </div>

        {/* Profile image on the right side */}
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full object-cover" src={assets.profile_image} alt="Profile" />
        </div>
      </nav>

      {/* Black underline (responsive <hr> tag) */}
      <hr className="border-black w-full" />
    </>
  );
};

export default Navbar;
