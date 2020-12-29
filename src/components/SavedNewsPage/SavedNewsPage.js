import React from "react";

import "./SavedNewsPage.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

function SavedNewsPage() {
    return (
        <>
            <SavedNewsHeader/>
            <div className="cards">
                <NewsCardList style="own-card"/>
            </div>
        </>
    );
}

export default SavedNewsPage;
