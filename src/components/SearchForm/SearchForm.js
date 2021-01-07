import React from "react";

import "./SearchForm.css";

function SearchForm(props) {
  const { findNewsByKeyword } = props;
  const [currentKeyword, setCurrentKeyword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    findNewsByKeyword(currentKeyword)
  }

  const handleChange = (evt) => {
    setCurrentKeyword(evt.target.value);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input onChange={handleChange} value={currentKeyword} required name="keyword" id="keyword" placeholder="Введите тему новости" type="text" className="search__input"/>
      <button className="search__button">Искать</button>
    </form>
  );
}

export default SearchForm;
