import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx" 
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import MapPage from "./pages/MapPage.jsx"
import Community from "./pages/Community.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import PlacePage from "./pages/PlacePage.jsx"
import { CssBaseline } from "@material-ui/core"
import { useState } from "react"
// import LoadingBar from 'react-top-loading-bar'

import axios from 'axios'
// import { Toaster } from 'react-hot-toast'


function App() {

  const [progress, setProgress] = useState(0)


  return (
    
      <>
      
          {/* <LoadingBar
        color='#d6356a'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}
      <div className="container">
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage setProgress={setProgress}  />}></Route>
          <Route path="/login" element={<LoginPage setProgress={setProgress} />}></Route>
          <Route path="/register" element={<RegisterPage setProgress={setProgress}/>}></Route>
          <Route path="/map" element={<MapPage setProgress={setProgress} />}></Route>
          <Route path="/community" element={<Community setProgress={setProgress} />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage setProgress={setProgress} />}></Route>
          <Route path="/place/:placeId" element={<PlacePage setProgress={setProgress} />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App