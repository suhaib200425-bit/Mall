
import './App.css'
import NavBar from './compones/NavBar/NavBar'
import Cart from './page/Cart/Cart';
import Home from './page/Home/Home'
import Nesto from './page/Nesto/Nesto'
import { Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shope/:shope" element={<Nesto />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </>
  )
}

export default App
