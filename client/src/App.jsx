import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import MapPage from "./pages/MapPage.jsx"

import "./App.css"
import axios from 'axios'
// import { Toaster } from 'react-hot-toast'




import "./App.css"


function App() {

  return (
    <>
      {/* <Navbar /> */}
      {/* <Toaster position="bottom-right" toastOptions={{duration: 2000}}/> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          {/* <Route path="/register" element={<RegisterPage />}></Route> */}
          <Route path="/map" element={<MapPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App