import React from 'react';

function ImagePopup(props) {

  return(
    <div className={props.card.isOpen ? `popup popup_opened popup_darker` : `popup popup_darker`}>
      <div className="popup__image-container">
        <button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-icon" name="close-button"></button>
        <img className="popup__opened-image" src={props.card.cardInfo.link} alt={`Изображение: ${props.card.cardInfo.name}`} />
        <h2 className="popup__opened-place">{props.card.cardInfo.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;