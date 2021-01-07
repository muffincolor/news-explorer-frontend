import React from "react";

import nfImage from "../../images/notfound.svg";

import "./ErrorFound.css";

function ErrorFound() {
  return (
    <div className="notfound">
      <img className="notfound__image" alt="Ничего не найдено" src={nfImage}/>
      <h3 className="notfound__title">Ничего не найдено</h3>
      <p className="notfound__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
    </div>
  );
}

export default ErrorFound;
