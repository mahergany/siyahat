import Navbar from "../components/Navbar";
import BackgroundSlider from "../components/BackgroundSlider";
import { useEffect } from "react";


// import { Canvas } from "@react-three/fiber";



function HomePage({setProgress}){

    useEffect(() => {   
    setProgress(40);
    setTimeout(() => {
        setProgress(100);
    }, 2000);
}, []);



    return(
        <>
        {/* <img className=" " src="assets/Picture7.png" alt="" srcset="" />
        <img src="assets/Picture7.png" alt="" srcset="" /> */}
        <Navbar />
        <BackgroundSlider />
  
         {/* <Canvas>
 
         </Canvas> */}
        </>
    );
}

export default HomePage;