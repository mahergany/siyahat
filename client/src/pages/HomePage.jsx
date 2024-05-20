import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import BackgroundSlider from '../components/BackgroundSlider';
import ProvinceList from '../components/ProvinceList';
import Introduction from '../components/Introduction';
import { Twitter, Facebook, Instagram } from '@mui/icons-material';
import { Fade } from 'react-reveal'; 
import './HomePage.css';


function HomePage({ setProgress }) {
    useEffect(() => {
        setProgress(40);
        setTimeout(() => {
            setProgress(100);
        }, 2000);
    }, [setProgress]);

    return (
        <>
            {/* <BackgroundSlider /> */}
            <div className="homepage">
                <Navbar />
                <Fade bottom>
                    <Introduction />
                </Fade>
                <Fade bottom>
                    <ProvinceList />
                </Fade>
                <footer className="footer">
                    <div className="footer-container">
                        <div className="footer-left">
                            <img src="assets/titlemain.png" alt="Siyahat Logo" />
                        </div>
                        <div className="footer-center">
                            © 2024 Siyahat. All rights reserved.
                        </div>
                        <Fade bottom cascade> 
                            <div className="footer-right">
                                <a href="https://twitter.com/siyahat" target="_blank" rel="noopener noreferrer">
                                    <Twitter />
                                </a>
                                <a href="https://facebook.com/siyahat" target="_blank" rel="noopener noreferrer">
                                    <Facebook />
                                </a>
                                <a href="https://instagram.com/siyahat" target="_blank" rel="noopener noreferrer">
                                    <Instagram />
                                </a>
                            </div>
                        </Fade>
                    </div>
                </footer>
            </div>
        </>
    );
}
export default HomePage;
