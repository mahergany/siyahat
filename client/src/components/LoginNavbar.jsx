import {Link, useMatch, useResolvedPath } from "react-router-dom"
import "./Navbar.css"

function Navbar(){

    return(
        <nav className="nav">
            <h2><Link to="/">SIYAHAT</Link></h2>
            {/* <ul>
                <CustomLink to="/map">Map</CustomLink>
                <CustomLink to="/login">Login</CustomLink>
            </ul> */}
        </nav>
    );
}

function CustomLink({to,children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path:resolvedPath.pathname, end:true});
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default Navbar;