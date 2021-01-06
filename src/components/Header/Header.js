import React from "react";

import "./Header.css";
import Navigation from "../Navigation/Navigation";
import {NavLink, useHistory} from "react-router-dom";

function Header(props) {
  const {style, setLoginPopupActive, onSignOut } = props;

  const [hiddenMenuActive, setHiddenMenuActive] = React.useState(false);

  const handleBurgerClick = () => {
    setHiddenMenuActive(!hiddenMenuActive);
  }

  return (
    <header className={`header ${hiddenMenuActive ? "header_active" : ""}`}>
      <NavLink to="/"
               className={`header__logo ${style === "dark" && !hiddenMenuActive ? "header__logo_dark" : ""}`}>NewsExplorer</NavLink>
      <button
        className={`header__burger ${hiddenMenuActive ? "header__burger_active" : ""} ${style === 'dark' ? "header__burger_dark" : ""}`}
        onClick={handleBurgerClick}/>
      <Navigation onSignOut={onSignOut} setLoginPopupActive={setLoginPopupActive} isHiddenMenuActive={hiddenMenuActive} style={style}/>
    </header>
  );
}

export default Header;
