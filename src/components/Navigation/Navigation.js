import React from "react";
import {NavLink} from 'react-router-dom'

import logout from "../../images/logout.svg";
import logout_dark from "../../images/logout_dark.svg";
import {UserLoginContext} from "../../contexts/UserLoginContext";

import "./Navigation.css";

function Navigation(props) {
  const currentUser = React.useContext(UserLoginContext);
  const {style, isHiddenMenuActive, setLoginPopupActive, onSignOut} = props;

  const handleSignOut = () => {
    onSignOut();
  }

  const handleLoginBtnClick = () => {
    setLoginPopupActive(true);
  }

  return (
    <div
      className={`navigation ${style === "dark" ? "navigation_dark" : ""} ${isHiddenMenuActive ? "navigation_active" : "navigation_inactive"}`}>
      <nav className="navigation__links">
        <NavLink exact to="/"
                 activeClassName={style === "dark" ? "navigation__link_dark_active" : "navigation__link_light_active"}
                 className={`navigation__link ${style === "dark" ? "navigation__link_dark" : "navigation__link_light"}`}>Главная</NavLink>
        {currentUser._id ? <NavLink exact to="/saved-news"
                               activeClassName={style === "dark" ? "navigation__link_dark_active" : "navigation__link_light_active"}
                               className={`navigation__link ${style === "dark" ? "navigation__link_dark" : "navigation__link_light"}`}>Сохраненные
          статьи</NavLink> : <></>}
      </nav>
      {currentUser._id ?
        <button onClick={handleSignOut}
          className={`navigation__profile-button ${style === "dark" && !isHiddenMenuActive ? "navigation__button_dark" : "navigation__button_light"}`}>
          <span className="navigation__profile-name">{currentUser.name}</span>
          <img src={style === "dark" ? logout_dark : logout} className="navigation__profile-image" alt="Выйти"/>
        </button>
        :
        <button onClick={handleLoginBtnClick}
          className={`navigation__button ${style === "dark" && !isHiddenMenuActive ? "navigation__button_dark" : "navigation__button_light"}`}>Авторизоваться</button>}
    </div>
  );
}

export default Navigation;
