import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

// import Home from "./pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import ExplourMenu from "./Components/ExplourMenu/ExplourMenu";
import FoodDishplay from "./Components/FoodDisplay/FoodDishplay";
import SowMenuItems from "./Components/ExplourMenu/SowMenuItems";
import AppDownload from "./Components/AppDownload/AppDownload";
import LoginPopUp from "./Components/Loginpoup.jsx/LoginPopUp";
// import Menu from "./Components/Menu/Menu";
import PlaceOrderPage from "./Components/placeOrderPage/PlaceOrderPage";
import VerifyOrder from "./Components/VerifyOrder/VerifyOrder";
import MyOrders from "./Components/MyOrders/MyOrders";
import ContactPage from "./Components/ContactPage/ContactPage";
function App() {
  const [loinpopup, setLoginpopup] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <Header />
          <ExplourMenu />
          <FoodDishplay />
          <AppDownload />
          <Footer />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <Cart/>
          <Footer />
        </>
      ),
    },
    {
      path: "/menuItems",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <SowMenuItems />
          <Footer />
        </>
      ),
    },
    {
      path: "/menu",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <ExplourMenu />
          <Footer />
        </>
      ),
    },
    {
      path: "/placeOrder",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <PlaceOrderPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/verify",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <VerifyOrder />
          <Footer />
        </>
      ),
    },
    {
      path: "/myOrders",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <MyOrders />
          <Footer />
        </>
      ),
    },
    {
      path: "/mobileApp",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <AppDownload />
          <Footer />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
        {loinpopup && <LoginPopUp setLoginpopup={setLoginpopup} />}
          <Navbar setLoginpopup={setLoginpopup} />
          <ContactPage />
          <Footer />
        </>
      ),
    },
  ]);

  // Return the RouterProvider with the defined router
  return <RouterProvider router={router} />;
}

export default App;
