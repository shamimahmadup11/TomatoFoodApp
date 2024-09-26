import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 
const router = createBrowserRouter([
  {
  path: '/',
  element: <> <ToastContainer/><Navbar /> <Sidebar/></>,
  }
])

  return <RouterProvider  router={router} />
  
}

export default App
