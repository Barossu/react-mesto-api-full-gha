import React from 'react';
import errorImage from '../images/Error.svg';
import successImage from '../images/success.svg';

function InfoTooltip({name, isOpen, onClose, isRegister}) {
  return (
    <div className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`}>
        <div className="popup__container">
          <button onClick={onClose} type="button" className="popup__close-icon" aria-label="Закрыть" name="close-button" />
          <img className='popup__image' src={isRegister.register ? successImage : errorImage}/>
          <h2 className="popup__info-text">{isRegister.text}</h2>
        </div>        
      </div>
  )
};

export default InfoTooltip;