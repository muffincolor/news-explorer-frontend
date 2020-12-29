import React from "react";

import "./NewsCardList.css";
import Card from "../Card/Card";

function NewsCardList(props) {
    const { style } = props;

    return (
        <ul className="cards__list">
            <Card style={style}/>
            <Card style={style}/>
            <Card style={style}/>
        </ul>
    );
}

export default NewsCardList;
