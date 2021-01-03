import React from "react";

import "./SavedNewsPage.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

function SavedNewsPage(props) {
  const { changeStyle } = props;

  React.useEffect(() => {
    if (document.documentElement.clientWidth < 768) {
      changeStyle("light");
    }
    changeStyle("dark");
  });

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
