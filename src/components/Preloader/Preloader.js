import React from "react";

import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__circle">
        <div className="preloader__circle-help"/>
      </div>
      <span className="preloader__text">Идет поиск новостей...</span>
    </div>
  );
}

export default Preloader;
