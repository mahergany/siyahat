import './App.css'
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import MapPage from "./pages/MapPage.jsx"

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/map" element={<MapPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
