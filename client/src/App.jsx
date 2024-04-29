import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx" 
import LoginPage from "./pages/LoginPage.jsx"
import MapPage from "./pages/MapPage.jsx"
import Community from "./pages/Community.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import { CssBaseline } from "@material-ui/core"

import axios from 'axios'
// import { Toaster } from 'react-hot-toast'







function App() {

  return (
    <>
      {/* <Navbar /> */}
      {/* <Toaster position="bottom-right" toastOptions={{duration: 2000}}/> */}
      <div className="container">
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          {/* <Route path="/register" element={<RegisterPage />}></Route> */}
          <Route path="/map" element={<MapPage />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App