
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

function App() {
  const hideNavbar = ["/auth","/"];
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
      </Routes>
    </>
  )
}

export default App
