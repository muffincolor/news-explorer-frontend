import React from "react";

import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search">
      <input placeholder="Введите тему новости" type="text" className="search__input"/>
      <button className="search__button">Искать</button>
    </form>
  );
}

export default SearchForm;
