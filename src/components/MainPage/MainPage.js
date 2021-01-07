import React from "react";

import "./MainPage.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

import newsApi from '../../utils/NewsApi'
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import NotFoundCards from "../NotFoundCards/NotFoundCards";
import ErrorFound from "../ErrorFound/ErrorFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import {showCardsAmount, waitTimeout} from "../../utils/constants";

function MainPage(props) {
  const { setCurrentUser, onSignOut, setLoginPopupActive, isLoginPopupActive } = props;

  const [currentNewsAmount, setCurrentNewsAmount] = React.useState(showCardsAmount);

  const [alreadyFoundSth, setAlreadyFoundSth] = React.useState(false);
  const [isFormBlocked, setFormBlocked] = React.useState(false);

  const [articlesData, setArticlesData] = React.useState([]);
  const [articlesDataHidden, setArticlesDataHidden] = React.useState(true);
  const [isPreloaderActive, setPreloaderActive] = React.useState(false);
  const [isNotFoundActive, setNotFoundActive] = React.useState(false);
  const [isErrorActive, setErrorActive] = React.useState(false);

  const [isRegisterPopupActive, setRegisterPopupActive] = React.useState(false);
  const [isSupportPopupActive, setSupportPopupActive] = React.useState(false);

  const [registerMessageError, setRegisterMessageError] = React.useState("");
  const [loginMessageError, setLoginMessageError] = React.useState("");

  React.useEffect(() => {
    document.addEventListener('keyup', handleClosePopupsByEscape);

    if(localStorage.getItem("jwt")) {
      mainApi.getUserInfo(localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setCurrentUser({});
      })
    }

    if (JSON.parse(localStorage.getItem("articles"))) {
      setAlreadyFoundSth(true);
      setArticlesData(JSON.parse(localStorage.getItem("articles")));
    }

    return () => {
      document.removeEventListener('keyup', handleClosePopupsByEscape);
    }
  }, [isLoginPopupActive, isRegisterPopupActive, isSupportPopupActive]);

  const changeDateFormat = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  const findNewsByKeyword = (keyword) => {
    setAlreadyFoundSth(true);
    setPreloaderActive(true);

    const currentDate = new Date();
    const pastDate = new Date(currentDate.valueOf() - ((24 * 60 * 60 * 1000) * 7));

    setTimeout(() => {
      if(articlesData.length === 0) {
        console.log(articlesData);
        setErrorActive(true);
      }
    }, waitTimeout * 1000);

    newsApi.getNewsByKeyword(keyword, changeDateFormat(pastDate), changeDateFormat(currentDate), 100)
      .then((res) => {
        if (res.articles.length === 0) {
          localStorage.removeItem("articles");
          setPreloaderActive(false);
          setNotFoundActive(true);
          return;
        } else if(res.articles.length > 3) {
          setArticlesDataHidden(true);
        }
        setPreloaderActive(false);
        localStorage.setItem("articles", JSON.stringify(res.articles));
        localStorage.setItem("lastKeyword", keyword);
        setArticlesData(res.articles);
      })
      .catch((err) => {
        setErrorActive(true);
      });
  }

  const handleRegister = (values) => {
    const { email, password, name } = values;
    setFormBlocked(true);
    mainApi.registerUser(email, password, name)
    .then((res) => {
      if(res.message) {
        setRegisterMessageError(res.message);
        return;
      }

      closeAllPopups();
      setFormBlocked(false);
      setSupportPopupActive(true);
    })
    .catch((err) => {
      setRegisterMessageError(`На сервере произошла обшибка ${err.status}`);
    });
  }

  const handleLogin = (values) => {
    const { email, password } = values;
    setFormBlocked(true);
    mainApi.loginUser(email, password)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      closeAllPopups();
      mainApi.getUserInfo(localStorage.getItem("jwt"))
      .then((res) => {
        setFormBlocked(false);
        setCurrentUser(res);
      })
      .catch((err) => {
        setCurrentUser({});
      })
    })
    .catch((err) => {
      setLoginMessageError(`На сервере произошла обшибка ${err.status}`);
    });
  }

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

  const openRegisterPopup = () => {
    closeAllPopups();
    setRegisterPopupActive(true);
  }

  const openLoginPopup = () => {
    closeAllPopups();
    setLoginPopupActive(true);
  }

  const showCards = () => {
    if(currentNewsAmount + showCardsAmount >= articlesData.length) {
      setArticlesDataHidden(false);
    } else {
      setCurrentNewsAmount(currentNewsAmount + showCardsAmount);
    }
  }

  return (
    <>
      {isLoginPopupActive ?
        <Login isFormBlocked={isFormBlocked} loginMessageError={loginMessageError} setLoginMessageError={setLoginMessageError} openRegisterPopup={openRegisterPopup} onLogin={handleLogin} onClose={closePopupsByButtons}/>
        :
        <></>
      }

      {isRegisterPopupActive ?
        <Register isFormBlocked={isFormBlocked} setRegisterMessageError={setRegisterMessageError} registerMessageError={registerMessageError} openLoginPopup={openLoginPopup} onRegister={handleRegister} onClose={closePopupsByButtons}/>
        :
        <></>
      }

      {isSupportPopupActive ?
        <PopupWithForm closePopupsByButtons={closePopupsByButtons} title="Пользователь успешно зарегистрирован!">
          <button className="popup__login-button" onClick={openLoginPopup}>Войти</button>
        </PopupWithForm>
        :
        <></>
      }

      <Header onSignOut={onSignOut} setLoginPopupActive={setLoginPopupActive} style="light"/>

      <div className="main">
        <div className="main__content">
          <h1 className="main__title">Что творится в мире?</h1>
          <p className="main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном
            кабинете.</p>
          <SearchForm findNewsByKeyword={findNewsByKeyword}/>
        </div>
      </div>
      {
        alreadyFoundSth ?
          <>
            {
              isErrorActive ?
                <ErrorFound/>
                :
                <>
                  {
                    isPreloaderActive ?
                      <Preloader/>
                      :
                      <>
                        {
                          isNotFoundActive ?
                            <NotFoundCards/>
                            :
                            <>
                              {
                                articlesDataHidden ?
                                  <div className="cards">
                                    <h2 className="cards__title">Результаты
                                      поиска</h2>
                                    <NewsCardList setLoginPopupActive={setLoginPopupActive} articles={articlesData.slice(0, currentNewsAmount)}/>
                                    <button className="cards__button" onClick={showCards}>Показать еще</button>
                                  </div>
                                  :
                                  <div className="cards">
                                    <h2 className="cards__title">Результаты
                                      поиска</h2>
                                    <NewsCardList setLoginPopupActive={setLoginPopupActive} articles={articlesData}/>
                                  </div>
                              }
                            </>
                        }
                      </>
                  }
                </>
            }
          </>
          :
          <></>
      }
      <About/>
    </>
  );
}

export default MainPage;
