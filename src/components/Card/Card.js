import React from "react";

import "./Card.css";

function Card(props) {
    const {style} = props;
    const saveReference = React.useRef(null);

    const handleSaveHover = (e) => {
        saveReference.current.classList.toggle(style === "own-card" ? 'card__delete-help_active' : 'card__save-login_active');
    }

    return (
        <li className="card">
            {style === "own-card" ?
                <>
                    <div className="card__delete">
                        <span ref={saveReference} className="card__delete-help">Убрать из сохранённых</span>
                        <button onMouseEnter={handleSaveHover} onMouseLeave={handleSaveHover}
                                className="card__delete-button"/>
                    </div>
                    <span className="card__keyword">Природа</span>
                </>
                :
                <div className="card__save">
                    <span ref={saveReference} className="card__save-login">Войдите, чтобы сохранять статьи</span>
                    <button onMouseEnter={handleSaveHover} onMouseLeave={handleSaveHover}
                            className="card__save-button card__save-button_active"/>
                </div>}
            <img className="card__image" alt="Фото"
                 src="https://byrich.ru/uploads/posts/2018-12/1545047714_v-rossii-vyros-obem-vydachi-kreditnye-kart.jpg"/>
            <div className="card__content">
                <span className="card__date">2 августа, 2019</span>
                <h4 className="card__title">Национальное достояние – парки</h4>
                <p className="card__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала
                    складываться система национальных парков – охраняемых территорий, где и сегодня каждый может
                    приобщиться к природе.</p>
                <span className="card__producer">Лента.ру</span>
            </div>
        </li>
    );
}

export default Card;
