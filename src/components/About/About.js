import React from "react";

import "./About.css";

function About() {
    return (
        <div className="about">
            <img src="https://sun9-56.userapi.com/impg/o4zJD3YZKC1K3X8KR9QYooL8UeqzjwLXIUKiMw/jNLj9F7aDOA.jpg?size=1344x1792&quality=96&proxy=1&sign=d5f7e4752431312849e6d3e7eb89d71e&type=album" alt="Фото профиля" className="about__photo"/>
            <div className="about__content">
                <h2 className="about__title">Об авторе</h2>
                <p className="about__subtitle">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
                <p className="about__subtitle">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
            </div>
        </div>
    );
}

export default About;
