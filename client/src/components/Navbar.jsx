import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userid = useSelector((state) => state.user?._id);

    const [mobile, setMobile] = useState(false);

    return (
        <div className="nav">
            <Link to="/">
                <img className="title" src="assets/siyahatdark.png" alt="Logo" />
            </Link>
            <ul className={mobile ? "mobile-links" : "nav-links"} onClick={() => setMobile(false)}>
                <li><Link className="li" to="/map">Map</Link></li>
                {userid && (
                    <>
                        <li><Link className="li" to="/community">Community</Link></li>
                        <li><Link className="li" to={`/profile/${userid}`}>Profile</Link></li>
                        <li><Link className="li" to={`/savedposts/${userid}`}>Saved Posts</Link></li>
                    </>
                )}
                {!userid ? (
                    <>
                        <li><Link className="li" to="/register">Register</Link></li>
                        <li><Link className="li" to="/login">Login</Link></li>
                    </>
                ) : (
                    <li><Link className="li" to="/" onClick={() => dispatch(setLogout())}>Logout</Link></li>
                )}
            </ul>
            <div className="mobile">
                <img 
                    src={`assets/${mobile ? "close.png" : "menu.png"}`} 
                    onClick={() => setMobile(!mobile)} 
                    alt="menu-toggle" 



                />
            </div>
        </div>
    );
}

export default Navbar;
