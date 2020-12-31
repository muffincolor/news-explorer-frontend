import React from "react";

import "./MainPage.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function MainPage(props) {
  const [isLoginPopupActive, setLoginPopupActive] = React.useState(false);
  const [isRegisterPopupActive, setRegisterPopupActive] = React.useState(false);
  const [isSupportPopupActive, setSupportPopupActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('keyup', handleClosePopupsByEscape);

    return () => {
      document.removeEventListener('keyup', handleClosePopupsByEscape);
    }
  }, [isLoginPopupActive, isRegisterPopupActive, isSupportPopupActive]);

  const handleClosePopupsByEscape = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setLoginPopupActive(false);
    setRegisterPopupActive(false);
    setSupportPopupActive(false);
  }

  const closePopupsByButtons = (e) => {
    if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup__close-btn')) {
      document.querySelector('.popup_active').classList.add('popup_inactive');
      setTimeout(() => {
        closeAllPopups();
      }, 400);
    }
  }

  return (
    <>
      {isLoginPopupActive ?
        <PopupWithForm closePopupsByButtons={closePopupsByButtons} title="Вход">
          <label htmlFor="email" className="popup__label">Email</label>
          <input required placeholder="Введите почту" id="email" name="email" className="popup__input"/>
          <span className="popup__error">Неправильный формат email</span>
          <label htmlFor="password" className="popup__label">Пароль</label>
          <input required placeholder="Введите пароль" id="password" name="email" className="popup__input"/>
          <span className="popup__error">Неправильный формат пароля</span>
          <button type="submit" className="popup__button popup__button_disabled">Войти</button>
          <span className="popup__help">или <span className="popup__help-link">Зарегистрироваться</span></span>
        </PopupWithForm>
        :
        <></>
      }

      {isRegisterPopupActive ?
        <PopupWithForm closePopupsByButtons={closePopupsByButtons} title="Регистрация">
          <label htmlFor="email" className="popup__label">Email</label>
          <input required placeholder="Введите почту" id="email" name="email" className="popup__input"/>
          <span className="popup__error">Неправильный формат email</span>
          <label htmlFor="password" className="popup__label">Пароль</label>
          <input required placeholder="Введите пароль" id="password" name="email" className="popup__input"/>
          <span className="popup__error">Неправильный формат пароля</span>
          <label htmlFor="name" className="popup__label">Имя</label>
          <input required placeholder="Введите своё имя" id="name" name="email" className="popup__input"/>
          <span className="popup__error">Неправильный формат имени</span>
          <button type="submit" className="popup__button popup__button_disabled">Зарегистрироваться</button>
          <span className="popup__help">или <span className="popup__help-link">Войти</span></span>
        </PopupWithForm>
        :
        <></>
      }

      {isSupportPopupActive ?
        <PopupWithForm closePopupsByButtons={closePopupsByButtons} title="Пользователь успешно зарегистрирован!">
          <button className="popup__login-button">Войти</button>
        </PopupWithForm>
        :
        <></>
      }

      <div className="main">
        <div className="main__content">
          <h1 className="main__title">Что творится в мире?</h1>
          <p className="main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном
            кабинете.</p>
          <SearchForm/>
        </div>
      </div>
      <div className="cards">
        <h2 className="cards__title" onClick={(e) => setRegisterPopupActive(!isRegisterPopupActive)}>Результаты
          поиска</h2>
        <NewsCardList/>
        <button className="cards__button">Показать еще</button>
      </div>
      <About/>
    </>
  );
}

export default MainPage;
