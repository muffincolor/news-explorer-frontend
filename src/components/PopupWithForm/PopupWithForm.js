import React from 'react';

import "./PopupWithForm.css";

const PopupWithForm = function (props) {
  const {isOpen, onSubmit, title, children, name, closePopupsByButtons} = props;

  const handleClosePopup = (e) => {
    closePopupsByButtons(e);
  }

  return (
    <div onClick={handleClosePopup} className={`popup popup__close popup_active`}>
      <div className="popup__form-block">
        <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          <form className="popup__form" noValidate onSubmit={onSubmit}>
            {children}
          </form>
        </div>
        <button className="popup__close-btn" onClick={handleClosePopup}/>
      </div>
    </div>
  )
}

export default PopupWithForm
