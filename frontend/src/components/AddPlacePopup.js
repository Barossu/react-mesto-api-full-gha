import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }){

  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceNameChange(e){
    setPlaceName(e.target.value);
  };

  function handlePlaceLinkChange(e){
    setPlaceLink(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();
    onAddPlace(placeName, placeLink)
  }

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('')
  }, [isOpen])

  return(
    <PopupWithForm name='addPlace' title='Новое место' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-container">
        <input onChange={handlePlaceNameChange} value={placeName} type="text" name="name" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" /> 
        <span className="popup__error" id="place-name-field-error"></span>
      </label>
      <label className="popup__input-container"> 
        <input onChange={handlePlaceLinkChange} value={placeLink} type="url" name="link" className="popup__input" placeholder="Ссылка на картинку" required />
        <span className="popup__error" id="image-link-field-error"></span>
      </label>
    </PopupWithForm>
)
};

export default AddPlacePopup;