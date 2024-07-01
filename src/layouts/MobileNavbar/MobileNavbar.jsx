import { useState, useContext, useEffect } from "react";
import { motion } from 'framer-motion';
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import style from "./styles/MobileNavbar.module.scss";
import Headroom from "react-headroom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import defaultImg from '../../assets/images/defaultImg.jpg';
import AuthContext from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Login');
    authCtx.logout();
  };

  useEffect(() => {
    const links = document.querySelectorAll(`.${style.navLink} a`);
    
    const handleMouseOver = (event) => {
      setHoveredLink(event.target);
    };

    const handleMouseOut = () => {
      setHoveredLink(null);
    };

    links.forEach(link => {
      link.addEventListener('mouseover', handleMouseOver);
      link.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseover', handleMouseOver);
        link.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    if (isOpen) {
      toggleMenu();
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleLinkClick();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const listVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, y: 50 }
  };

  return (
    <Headroom>
      <nav className={style.nav}>
        <div className={style.mobile}>
          <div className={style.icon} onClick={toggleMenu}>
            {isOpen ? <RxCross2 size={24} /> : <FiMenu size={24} />}
          </div>
          <div className={`${style.logoContainer} ${isOpen ? style.blur : ""}`}>
            <Link to="/" onClick={handleLogoClick}>
              <h1 className={`${style.fedtitle} ${isOpen ? style.blur : ""}`}>FED</h1>
            </Link>
          </div>
        </div>

        {isOpen && (
          <motion.div
            className={style.listbody}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ul className={`${style.navItems} ${isOpen ? style.open : ""}`}>
              {authCtx.isLoggedIn && (
                <>
                  <NavLink to="/profile" className="LinkStyle" onClick={toggleMenu}>
                    <img
                      src={authCtx.user.pic || defaultImg}
                      alt="Profile"
                      className={style.profileImg}
                    />
                  </NavLink>
                  <div className={style.name}>{authCtx.user.name}</div>
                </>
              )}
              <motion.li
                className={style.navLink}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listVariants}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              >
                <Link
                  to="/"
                  style={{ 
                    background: isActive("/") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/')) ? "var(--primary)" : "transparent",
                    WebkitBackgroundClip: isActive("/") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/')) ? "text" : "initial",
                    color: isActive("/") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/')) ? "transparent" : "inherit"
                  }}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </motion.li>
              <motion.li
                className={style.navLink}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listVariants}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
              >
                <Link
                  to="/Events"
                  style={{ 
                    background: isActive("/Events") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/Events')) ? "var(--primary)" : "transparent",
                    WebkitBackgroundClip: isActive("/Events") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/Events')) ? "text" : "initial",
                    color: isActive("/Events") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/Events')) ? "transparent" : "inherit"
                  }}
                  onClick={toggleMenu}
                >
                  Events
                </Link>
              </motion.li>
              <motion.li
                className={style.navLink}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listVariants}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
              >
                <Link
                  to="/Social"
                  style={{ 
                    background: isActive("/Social") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/Social')) ? "var(--primary)" : "transparent",
                    WebkitBackgroundClip: isActive("/Social") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/Social')) ? "text" : "initial",
                    color: isActive("/Social") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/Social')) ? "transparent" : "inherit"
                  }}
                  onClick={toggleMenu}
                >
                  Social
                </Link>
              </motion.li>
              <motion.li
                className={style.navLink}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listVariants}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
              >
                <Link
                  to="/Team"
                  style={{ 
                    background: isActive("/Team") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/Team')) ? "var(--primary)" : "transparent",
                    WebkitBackgroundClip: isActive("/Team") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/Team')) ? "text" : "initial",
                    color: isActive("/Team") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/Team')) ? "transparent" : "inherit"
                  }}
                  onClick={toggleMenu}
                >
                  Team
                </Link>
              </motion.li>
              {authCtx.isLoggedIn ? (
                <motion.button
                  className={style.mobilesignup}
                  onClick={handleLogout}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={listVariants}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
                >
                  <MdOutlineLogout size={25} /> Logout
                </motion.button>
              ) : (
                <motion.a
                  href="/Login"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={listVariants}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
                  onClick={toggleMenu}
                >
                  <button className={style.mobilesignup}>
                    Login/Sign up
                  </button>
                </motion.a>
              )}
            </ul>
          </motion.div>
        )}
      </nav>
    </Headroom>
  );
}
