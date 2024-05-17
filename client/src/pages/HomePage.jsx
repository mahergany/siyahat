import Navbar from "../components/Navbar";
import BackgroundSlider from "../components/BackgroundSlider";
import { useEffect } from "react"; 


function HomePage({setProgress}){

    useEffect(() => {   
    setProgress(40);
    setTimeout(() => {
        setProgress(100);
    }, 2000);
}, []);

    return(
        <>
        <Navbar />
        <BackgroundSlider />
        </>
    );
}

export default HomePage;