
import './App.css'
import NavBar from './compones/NavBar/NavBar'
import Auth from './page/auth/Auth';
import Cart from './page/Cart/Cart';
import Home from './page/Home/Home'
import Nesto from './page/Nesto/Nesto'
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Splash from './page/Splash/Splash';
import AddProduct from './compones/AddProduct/AddProduct';
import Order from './page/Order/Order';

function App() {
  const hideNavbar = ["/auth", "/", "/edit"];
  const location = useLocation()
  return (
    <>
      <ToastContainer position='bottom-center'
        limit={1}
        autoClose={1000} />
      {!hideNavbar.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shope/:shope" element={<Nesto />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/edit/:productId" element={<AddProduct />} />
      </Routes>
    </>
  )
}

export default App
