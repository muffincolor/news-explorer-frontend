import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Register(props) {
  const { onClose, onRegister, openLoginPopup, registerMessageError, setRegisterMessageError, isFormBlocked } = props;

  const formReference = React.useRef(null);

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleInputChange = (event) => {
    setRegisterMessageError("");

    const target = event.target;
    const value = target.value;
    const name = target.name;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(formReference.current.checkValidity());
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsValid(false);
    onRegister(values);
  }

  return (
    <PopupWithForm formReference={formReference} onSubmit={handleSubmit} closePopupsByButtons={onClose} title="Регистрация">
      <label htmlFor="email" className="popup__label">Email</label>
      <input disabled={isFormBlocked} value={values.email || ""} onChange={handleInputChange} required placeholder="Введите почту" id="email" name="email" type="email" className="popup__input"/>
      <span className="popup__error">{errors.email}</span>
      <label htmlFor="password" className="popup__label">Пароль</label>
      <input disabled={isFormBlocked} value={values.password || ""} onChange={handleInputChange} required placeholder="Введите пароль" id="password" name="password" type="password" className="popup__input"/>
      <span className="popup__error">{errors.password}</span>
      <label htmlFor="name" className="popup__label">Имя</label>
      <input disabled={isFormBlocked} value={values.name || ""} onChange={handleInputChange} required placeholder="Введите своё имя" id="name" name="name" type="text" className="popup__input"/>
      <span className="popup__error">{errors.name}</span>
      { registerMessageError === "" ? <></> : <span className="popup__result-error">{registerMessageError}</span> }
      <button type="submit" disabled={!isValid} className={`popup__button ${ isValid ? "" : "popup__button_disabled"}`}>Зарегистрироваться</button>
      <span className="popup__help">или <span className="popup__help-link" onClick={openLoginPopup}>Войти</span></span>
    </PopupWithForm>
  );
}

export default Register;
