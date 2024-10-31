import { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./NavBar.css";
import menuBurger from "../../assets/images/icons/burger.png";
import closeIcon from "../../assets/images/icons/close.png";
const NavBar = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const handleResize = () => {
    if (window.innerWidth > 920) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isOpenMenu}
      {isDesktop ? (
        <div className="nav-container section" id="navbar">
          <div className="logo">AIrrigate</div>
          <div className="nav-items">
            <Link to="/" className="nav-items">
              Home
            </Link>
            /
            <Link to="/crop" className="nav-items">
              Crop
            </Link>
            /
            <Link to="/fertilizer" className="nav-items">
              Fertilizer
            </Link>{" "}
            /
            <Link to="/yield" className="nav-items">
              Yield
            </Link>{" "}
            /
            <Link to="/disease" className="nav-items">
              Disease
            </Link>
          </div>
          <Link to="#footer" className="contact-button">
            Contact us
          </Link>
        </div>
      ) : (
        <div className="nav-container section" id="navbar">
          <div className="burger">
            <img src={menuBurger} alt="burger" onClick={toggleMenu} />
          </div>
          <Link to="#footer" className="contact-button">
            Contact us
          </Link>
          <div
            className="sidebar"
            style={
              isOpenMenu
                ? { transform: "translateX(0)" }
                : { transform: "translateX(-100vw)" }
            }
          >
            <div className="logo-container">
              <div className="logo">AIrrigate</div>
              <img
                src={closeIcon}
                alt="burger"
                className="close-button"
                onClick={toggleMenu}
              />
            </div>
            <div className="nav-items nav-item-container">
              <Link to="/" className="nav-items" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/crop" className="nav-items" onClick={toggleMenu}>
                Crop
              </Link>
              <Link to="/fertilizer" className="nav-items" onClick={toggleMenu}>
                Fertilizer
              </Link>
              <Link to="/yield" className="nav-items" onClick={toggleMenu}>
                Yield
              </Link>
              <Link to="/disease" className="nav-items" onClick={toggleMenu}>
                Disease
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default NavBar;
