import React from "react";
import {NavLink} from 'react-router-dom'

import github from "../../images/github-logo.svg"
import facebook from "../../images/facebook-logo.svg"

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copyright">© 2020 Supersite, Powered by News API</span>
      <div className="footer__menu">
        <nav className="footer__links">
          <NavLink to="/" className="footer__link">Главная</NavLink>
          <NavLink to="https://praktikum.yandex.ru/" className="footer__link">Яндекс.Практикум</NavLink>
        </nav>
        <div className="footer__image-links">
          <img src={github} className="footer__image-link" alt="Ссылка на GitHub"/>
          <img src={facebook} className="footer__image-link" alt="Ссылка на Facebook"/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
