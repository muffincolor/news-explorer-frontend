import React from "react";

import "./SavedNewsPage.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Header from "../Header/Header";
import MainApi from "../../utils/MainApi";

function SavedNewsPage(props) {
  const {onSignOut} = props;

  const [style, setStyle] = React.useState("dark");

  const [userArticles, setUserArticles] = React.useState([]);

  React.useEffect(() => {
    if (document.documentElement.clientWidth < 768) {
      setStyle("light");
    }

    MainApi.getUserArticles(localStorage.getItem("jwt"))
    .then((res) => {
      setUserArticles(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <Header onSignOut={onSignOut} style={style}/>
      <SavedNewsHeader userArticles={userArticles}/>
      <div className="cards">
        <NewsCardList setUserArticles={setUserArticles} articles={userArticles} style="own-card"/>
      </div>
    </>
  );
}

export default SavedNewsPage;
