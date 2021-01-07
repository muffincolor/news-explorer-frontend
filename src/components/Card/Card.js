import React from "react";
import MainApi from "../../utils/MainApi";
import {UserLoginContext} from "../../contexts/UserLoginContext";

import "./Card.css";

function Card(props) {
  const currentUser = React.useContext(UserLoginContext);
  const {style, card, saved, setLoginPopupActive, articles, setUserArticles } = props;
  const saveReference = React.useRef(null);

  const [isCardSaved, setCardSaved] = React.useState(false);
  const [userCard, setUserCard] = React.useState({});

  const handleSaveHover = (e) => {
    if(!currentUser._id) {
      saveReference.current.classList.toggle("card__save-login_active");
    } else if(style === "own-card") {
      saveReference.current.classList.toggle("card__delete-help_active");
    }
  }

  const parseDate = (str) => {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const date = new Date(str);
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  }

  const handleSaveCard = (evt) => {
    if(currentUser._id) {
      if (!evt.target.classList.contains("card__save-button_active")) {
        MainApi.addArticle(localStorage.getItem("lastKeyword"), card, localStorage.getItem("jwt"))
          .then((res) => {
            setUserCard(res);
            setCardSaved(true);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        MainApi.removeArticle(userCard._id, localStorage.getItem("jwt"))
          .then((res) => {
            setUserCard({});
            setCardSaved(false);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    } else {
      setLoginPopupActive(true);
    }
  }

  const handleDeleteCard = () => {
    MainApi.removeArticle(userCard._id, localStorage.getItem("jwt"))
      .then((res) => {
        deleteCard(userCard._id)
        setUserCard({});
        setCardSaved(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    if(saved._id) {
      setCardSaved(true);
      setUserCard(saved);
    }
  }, [saved]);

  const deleteCard = (id) => {
    const tempArray = articles.slice();
    tempArray.find((item, index) => {
      if(id === item._id) {
        const newArray = removeIndex(tempArray, index)
        setUserArticles(newArray);
      }
    });
  }

  const removeIndex = (array, index) => {
    delete array[index];
    array = array.filter(function(element) {
      return element !== undefined
    });
    return array;
  }

  return (
    <li className="card">
      {style === "own-card" ?
        <>
          <div className="card__delete">
            <span ref={saveReference} className="card__delete-help">Убрать из сохранённых</span>
            <button onMouseEnter={handleSaveHover} onMouseLeave={handleSaveHover} onClick={handleDeleteCard}
                    className="card__delete-button"/>
          </div>
          <span className="card__keyword">{card.keyword ? card.keyword[0].toUpperCase() + card.keyword.slice(1) : localStorage.getItem("lastKeyword").toUpperCase() + localStorage.getItem("lastKeyword").slice(1)}</span>
        </>
        :
        <div className="card__save">
          <span ref={saveReference} className="card__save-login">Войдите, чтобы сохранять статьи</span>
          <button onMouseEnter={handleSaveHover} onMouseLeave={handleSaveHover} onClick={handleSaveCard}
                  className={`card__save-button ${isCardSaved ? "card__save-button_active" : ""}`}/>
        </div>}
      <img className="card__image" alt="Фото"
           src={card.image ? card.image : card.urlToImage}/>
      <div className="card__content">
        <span className="card__date">{ parseDate(card.date ? card.date : card.publishedAt) }</span>
        <h4 className="card__title">{ card.title }</h4>
        <p className="card__text">{ card.text ? card.text : card.description }</p>
        <span className="card__producer">{ typeof(card.source) === "string" ? card.source : card.source.name }</span>
      </div>
    </li>
  );
}

export default Card;
