import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import style from "./styles/Navbar.module.scss";
import Headroom from 'react-headroom';
import logo from "../../assets/images/Logo/logo.svg";
import defaultImg from "../../assets/images/defaultImg.jpg"; 
import AuthContext from '../../context/AuthContext';

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Headroom>
      <nav className={`${style.nav} ${scroll ? style.scrolled : ''}`}>
        <Link to="/" onClick={handleLogoClick}>
          <div className={style.logo_div}>
            <img src={logo} alt="Logo" className={style.logo} />
            <div className={style.logo_text}></div>
          </div>
        </Link>
        {/* ///Social */}
        <ul className={style.navItems}> 
          <li className={style.navLink}>
          <NavLink 
  to="/" 
  style={{ 
    background: isActive("/") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/')) ? "var(--primary)" : "transparent",
    WebkitBackgroundClip: isActive("/") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/')) ? "text" : "initial",
    color: isActive("/") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/')) ? "transparent" : "inherit"
  }}
>
  Home
</NavLink>
          </li>
          <li className={style.navLink}>
          <NavLink 
  to="/Events" 
  style={{ 
    background: isActive("/Events") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/Events')) ? "var(--primary)" : "transparent",
    WebkitBackgroundClip: isActive("/Events") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/Events')) ? "text" : "initial",
    color: isActive("/Events") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/Events')) ? "transparent" : "inherit"
  }}
>
Events
</NavLink>
          </li>
          <li className={style.navLink}>
          <NavLink 
  to="/Social" 
  style={{ 
    background: isActive("/Social") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/Social')) ? "var(--primary)" : "transparent",
    WebkitBackgroundClip: isActive("/Social") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/Social')) ? "text" : "initial",
    color: isActive("/Social") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/Social')) ? "transparent" : "inherit"
  }}
>
Social
</NavLink>
          </li>
          <li className={style.navLink}>
          <NavLink 
  to="/Team" 
  style={{ 
    background: isActive("/Team") ? "var(--primary)" : (hoveredLink && hoveredLink.href.endsWith('/Team')) ? "var(--primary)" : "transparent",
    WebkitBackgroundClip: isActive("/Team") ? "text" : (hoveredLink && hoveredLink.href.endsWith('/Team')) ? "text" : "initial",
    color: isActive("/Team") ? "transparent" :(hoveredLink && hoveredLink.href.endsWith('/Team')) ? "transparent" : "inherit"
  }}
>
Team
</NavLink>
          </li>
        </ul>

        {authCtx.isLoggedIn ? (
          <NavLink to="/profile" className="LinkStyle">
            <div className={style.profileImgdiv}>   <img
              src={authCtx.user.pic || defaultImg}
              alt="Profile"
              className={style.profileImg}
            /></div>
         
          </NavLink>
        ) : (
          <a href="/Login">
            <button className={style.authButton}>Login</button>
          </a>
        )}

      </nav>
    </Headroom>
  );
}

export default Navbar;