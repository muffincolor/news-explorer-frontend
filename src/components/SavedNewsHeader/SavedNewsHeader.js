import React from "react";

import {UserLoginContext} from "../../contexts/UserLoginContext";

import "./SavedNewsHeader.css";

function SavedNewsHeader(props) {
  const currentUser = React.useContext(UserLoginContext);
  const {userArticles} = props;

  const [articlesKeywords, setArticlesKeywords] = React.useState([]);

  const analyzeArticlesKeywords = () => {
    const tempArray = userArticles.slice();
    let result = [];
    tempArray.forEach((article) => {
      result.push(article.keyword);
    });

    const newArray = result.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1;
      return prev;
    }, {})
    const keysSorted = Object.keys(newArray).sort((a, b) => newArray[a] - newArray[b])
    setArticlesKeywords(keysSorted.reverse());
  }

  React.useEffect(() => {
    analyzeArticlesKeywords();
  }, [userArticles]);

  const generateStringForMinKeywords = () => {
    let result = "";
    if (articlesKeywords.length !== 0) {
      const tempArray = articlesKeywords.slice();
      tempArray.forEach((keyword, index) => {
        if (index === tempArray.length - 1) {
          result += ` ${keyword[0].toUpperCase() + keyword.slice(1)}`;
        } else {
          result += ` ${keyword[0].toUpperCase() + keyword.slice(1)},`;
        }
      })
    }
    return result;
  }

  return (
    <div className="sv-news">
      <h1 className="sv-news__title">Сохраненные новости</h1>
      <p className="sv-news__subtitle">{currentUser.name}, у вас {userArticles.length} сохранённых статей</p>
      <span className="sv-news__keywords-list">По ключевым словам:
        {articlesKeywords.length > 3 ?
          <>
          <span
            className="sv-news__keywords"> {`${articlesKeywords[0][0].toUpperCase() + articlesKeywords[0].slice(1)}, ${articlesKeywords[1][0].toUpperCase() + articlesKeywords[1].slice(1)} `}</span>
          и
          <span
            className="sv-news__keywords">{` ${articlesKeywords.length - 2 > 4 ? `${articlesKeywords.length - 2}-и` : `${articlesKeywords.length - 2}-м`}`} другим</span>
          </>
          :
          <span className="sv-news__keywords">{generateStringForMinKeywords()}</span>
        }
      </span>
    </div>
  );
}

export default SavedNewsHeader;
