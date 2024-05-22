import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import BackgroundSlider from '../components/BackgroundSlider';
import ProvinceList from '../components/ProvinceList';
import Introduction from '../components/Introduction';
import FeatureSection from '../components/FeatureSection';
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
            <BackgroundSlider />
            <div className="homepage">
                <Navbar />
                <Fade bottom>
                    <Introduction />
                </Fade>
                
                <FeatureSection
                    title="Discover New Places"
                    text="Discover hidden gems with our interactive map feature. Get detailed guides and tips to uncover new adventures. Explore diverse regions, find local attractions, and plan your travels efficiently. Start your journey today!"
                    imageUrl="assets/map.jpg"
                />
                
                <FeatureSection
                    title="Share Your Experience"
                    text="Share your travel experiences and leave reviews for the places you've visited. Your insights can help fellow travelers make informed decisions and discover new places."
                    imageUrl="assets/review.jpg"
                    imageLeft
                />
                <FeatureSection
                    title="Befriend Other Travelers"
                    text="Connect with other travelers and make new friends along your journey. Our community feature allows you to interact, share experiences, and plan trips together."
                    imageUrl="assets/befriend.jpg"
                />
                <FeatureSection
                    title="Read Others' Reviews"
                    text="Gain insights from reviews left by other travelers. Learn from their experiences to enhance your own travel plans and avoid common pitfalls."
                    imageUrl="assets/read_reviews.jpg"
                    imageLeft
                />
                <FeatureSection
                    title="Monitor Trending Places in Real-Time"
                    text="Stay updated with our Discover Page feature, which lets you monitor trending places in real-time. See what's popular among travelers, and make sure you don't miss out on the hottest spots."
                    imageUrl="assets/trending.jpg"
                />
                <FeatureSection
                    title="Explore Our Provinces and Gallery"
                    text="Learn about the unique attractions and experiences offered by each of our provinces. Visit our gallery to view stunning images of beautiful places in Pakistan, complete with detailed information about each location."
                    imageUrl="assets/gallery.jpg"
                    imageLeft
                />
                 
                 <Fade bottom>
                    <ProvinceList />
                </Fade>
                
                <FeatureSection
                    title="Join Our Amazing Community"
                    text="To enjoy the full benefits of our platform, including sharing your reviews, befriending other travelers, and reading others' experiences, join our community. Register now to become part of an amazing network of travel enthusiasts!"
                    link="/register"
                    linkText="Register Now"
                />
               
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
