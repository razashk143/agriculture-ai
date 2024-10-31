import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {

    return(
        
        <div className="nav p-3 justify-content-end">
            <Link className= "nav-link" to="/" >
                Home
            </Link>
            <Link className= "nav-link" to="/crop" >
                Crop
            </Link>
            <Link className= "nav-link" to="/fertilizer" >
                Fertilizer
            </Link>
            <Link className= "nav-link" to="/yield" >
                Yield
            </Link>
            <Link className= "nav-link" to="/disease" >
                Disease
            </Link>
            <Link className= "nav-link" to="/services" >
                Services
            </Link>
            
        </div>
    )
}
export default NavBar;