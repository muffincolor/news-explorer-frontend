import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Login(props) {
  const { onClose, onLogin, openRegisterPopup, loginMessageError, setLoginMessageError } = props;

  const formReference = React.useRef(null);

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleInputChange = (event) => {
    setLoginMessageError("");

    const target = event.target;
    const value = target.value;
    const name = target.name;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(formReference.current.checkValidity());
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <PopupWithForm formReference={formReference} onSubmit={handleSubmit} closePopupsByButtons={onClose} title="Вход">
      <label htmlFor="email" className="popup__label">Email</label>
      <input value={values.email || ''} onChange={handleInputChange} required placeholder="Введите почту" id="email" name="email" className="popup__input"/>
      <span className="popup__error">{errors.email}</span>
      <label htmlFor="password" className="popup__label">Пароль</label>
      <input value={values.password || ''} onChange={handleInputChange} required type="password" placeholder="Введите пароль" id="password" name="password" className="popup__input"/>
      <span className="popup__error">{errors.password}</span>
      { loginMessageError === "" ? <></> : <span className="popup__result-error">{loginMessageError}</span> }
      <button type="submit" disabled={!isValid} className={`popup__button ${ isValid ? "" : "popup__button_disabled"}`}>Войти</button>
      <span className="popup__help">или <span className="popup__help-link" onClick={openRegisterPopup}>Зарегистрироваться</span></span>
    </PopupWithForm>
  );
}

export default Login;
