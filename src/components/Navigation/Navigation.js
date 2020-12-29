import React from "react";
import {NavLink} from 'react-router-dom'

import logout from "../../images/logout.svg";
import {UserLoginContext} from "../../contexts/UserLoginContext";

import "./Navigation.css";

function Navigation(props) {
    const isLoggedIn = React.useContext(UserLoginContext);
    const {style, isActive} = props;

    return (
        <div className={`navigation ${style === "dark" ? "navigation_dark" : ""} ${isActive ? "navigation_active" : "navigation_inactive"}`}>
            <nav className="navigation__links">
                <NavLink exact to="/" activeClassName={ style === "dark" ? "navigation__link_dark_active" : "navigation__link_light_active" } className={`navigation__link ${style === "dark" ? "navigation__link_dark" : "navigation__link_light"}`}>Главная</NavLink>
                { isLoggedIn ? <NavLink exact to="/saved-news" activeClassName={ style === "dark" ? "navigation__link_dark_active" : "navigation__link_light_active" } className={`navigation__link ${style === "dark" ? "navigation__link_dark" : "navigation__link_light"}`}>Сохраненные
                    статьи</NavLink> : <></> }
            </nav>
            {isLoggedIn ?
                <button className={`navigation__profile-button ${ style === "dark" && !isActive ? "navigation__button_dark" : "navigation__button_light" }`}>
                    <span className="navigation__profile-name">Грета</span>
                    <img src={logout} className="navigation__profile-image" alt="Выйти"/>
                </button>
                :
                <button className={`navigation__button ${ style === "dark" && !isActive ? "navigation__button_dark" : "navigation__button_light" }`}>Авторизоваться</button> }
        </div>
    );
}

export default Navigation;
