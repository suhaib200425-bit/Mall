
import './App.css'
import NavBar from './compones/NavBar/NavBar'
import Auth from './page/auth/Auth';
import Cart from './page/Cart/Cart';
import Home from './page/Home/Home'
import Nesto from './page/Nesto/Nesto'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <ToastContainer position='bottom-center'
        limit={1}
        autoClose={1000} />
      <NavBar />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shope/:shope" element={<Nesto />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
