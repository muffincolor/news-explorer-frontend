import React from "react";

import "./Header.css";
import Navigation from "../Navigation/Navigation";
import {NavLink} from "react-router-dom";

function Header(props) {
  const {style, isActivePopup, setActivePopup} = props

  const [active, setActive] = React.useState(false);

  return (
    <header className={`header ${active ? "header_active" : ""}`}>
      <NavLink to="/"
               className={`header__logo ${style === "dark" && !active ? "header__logo_dark" : ""}`}>NewsExplorer</NavLink>
      <button
        className={`header__burger ${active ? "header__burger_active" : ""} ${style === 'dark' ? "header__burger_dark" : ""}`}
        onClick={(e) => {
          setActivePopup(!isActivePopup);
          setActive(!active);
        }}/>
      <Navigation isActive={active} style={style}/>
    </header>
  );
}

export default Header;
