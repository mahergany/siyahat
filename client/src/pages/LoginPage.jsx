// import LoginNavbar  from "../components/LoginNavbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './LoginPage.css';
import LoginForm from '../components/LoginForm.jsx'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";


function LoginPage({setProgress}){
    // const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    useEffect(() => {   
        setProgress(40);
        setTimeout(() => {
            setProgress(100);
        }, 2000);
    }, []);
    
    return(
        <>
            <img className="center-image" src="assets/Picture2.png"></img>
            <img className="center-image"  src="assets/Picture3.png"></img>
            <img className="corner-image top-left rotate-once-c" src="assets/Picture1.png"></img>
            <img className="corner-image top-right rotate-once-cc"  src="assets/Picture4.png"></img>
            <img className="corner-image bottom-left rotate-once-c"  src="assets/Picture5.png"></img>
            <img className="corner-image bottom-right rotate-once-cc"  src="assets/Picture6.png"></img>
            
            <div className="header">
                Siyahat
            </div>

            <Box
                className="form-box"
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                height="50%"
                left="25%"
                borderRadius="1.5rem"
                backgroundColor="#f6f3e9"
                display="flex"    
                flexDirection="column" 
                alignItems="center"    
                justifyContent="center"
                overflow="visible"
                // backgroundColor={theme.palette.background.alt}
            >
                <LoginForm />
            </Box>
            
        </>
    );
}

export default LoginPage;