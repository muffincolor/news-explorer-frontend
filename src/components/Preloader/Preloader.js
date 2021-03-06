import React from "react";

import "./Preloader.css";

function Preloader() {
  const [loading, setLoading] = React.useState(true);

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
