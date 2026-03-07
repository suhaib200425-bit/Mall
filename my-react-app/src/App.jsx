
import './App.css'
import NavBar from './compones/NavBar/NavBar'
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
    </Routes>
    </>
  )
}

export default App
