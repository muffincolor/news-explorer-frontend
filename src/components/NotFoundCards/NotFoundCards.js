import React from "react";

import nfImage from "../../images/notfound.svg";

import "./NotFoundCards.css";

function NotFoundCards() {
    return (
        <div className="notfound">
            <img className="notfound__image" alt="Ничего не найдено" src={nfImage}/>
            <h3 className="notfound__title">Ничего не найдено</h3>
            <p className="notfound__text">К сожалению по вашему запросу<br/>ничего не найдено.</p>
        </div>
    );
}

export default NotFoundCards;
