import React from "react";

import "./SavedNewsHeader.css";

function SavedNewsHeader() {
    return (
        <div className="sv-news">
            <h1 className="sv-news__title">Сохраненные новости</h1>
            <p className="sv-news__subtitle">Грета, у вас 5 сохранённых статей</p>
            <span className="sv-news__keywords-list">По ключевым словам: <span className="sv-news__keywords">Природа, Тайга и 2-м другим</span></span>
        </div>
    );
}

export default SavedNewsHeader;
