import React from "react";

import "./NewsCardList.css";
import Card from "../Card/Card";
import MainApi from "../../utils/MainApi";
import {UserLoginContext} from "../../contexts/UserLoginContext";

function NewsCardList(props) {
  const currentUser = React.useContext(UserLoginContext);
  const {style, articles, setLoginPopupActive, setUserArticles} = props;

  const [userCards, setUserCards] = React.useState([]);

  const rerenderForCards = () => {
    const array = articles.slice();
    const result = [];

    const filteredCards = getUserCards();

    array.forEach((card, index) => {
      result.push(<Card articles={articles} setUserArticles={setUserArticles} style={style} setLoginPopupActive={setLoginPopupActive} saved={card._id ? card : compareCardsData(filteredCards, card)} key={index} card={card}/>);
    });
    return result;
  }

  const getUserCards = () => {
    const clone = userCards.slice();
    return clone.filter(function (value) {
      return (value.keyword === localStorage.getItem("lastKeyword"))
    });
  }

  const compareCardsData = (array, currentCard) => {
    let result = false;
    array.find((o) => {
      if (o.title === currentCard.title && o.publishedAt === currentCard.date) {
        result = o; // stop searching
      }
    });
    return result;
  }

  React.useEffect(() => {
    if(currentUser._id) {
      MainApi.getUserArticles(localStorage.getItem("jwt"))
        .then((res) => {
          setUserCards(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [articles, currentUser]);

  return (
    <ul className="cards__list">
      {rerenderForCards()}
    </ul>
  );
}

export default NewsCardList;
