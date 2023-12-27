import React from 'react';


function PopupWithForm({ isOpen, onClose, onSubmit, name, title, buttonText, children }){
  return(
    <div className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`}>
        <div className="popup__container">
          <button onClick={onClose} type="button" className="popup__close-icon" aria-label="Закрыть" name="close-button" />
          <h2 className="popup__form-text">{title}</h2>
          <form onSubmit={onSubmit} className="popup__form" name={name}>
            {children}
            <button type="submit" className="popup__button" name="submit-button">{buttonText}</button>
          </form>
        </div>        
      </div>
  )
};

export default PopupWithForm;