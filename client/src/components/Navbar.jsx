import {Link, useMatch, useResolvedPath } from "react-router-dom"
import "./Navbar.css"
import { useState } from "react";




function Navbar(){

    return(
        <nav className="nav">
            <h2><Link to="/">WSIYAHAT</Link></h2>
            <ul>
                {/* <CustomLink to="/map">Map</CustomLink>
                <CustomLink to="/register">Register</CustomLink>
                <CustomLink to="/login">Login</CustomLink> */}
                <Link to="/map">Map</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/community">Community</Link>
            </ul>
        </nav>
    );
}

// function CustomLink({to,children, ...props}){
//     const resolvedPath = useResolvedPath(to);
//     const isActive = useMatch({path:resolvedPath.pathname, end:true});
//     return(
//         <li className={isActive ? "active" : ""}>
//             <Link to={to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     );
// }

export default Navbar;