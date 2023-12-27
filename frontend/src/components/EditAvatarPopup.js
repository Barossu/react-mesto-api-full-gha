import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){

  const inputRef = React.useRef(null)
  
  function handleSubmit(e){
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value)
  }

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen])


  return(
    <PopupWithForm name='editAvatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-container"> 
        <input ref={inputRef} type="url" name="link" className="popup__input" placeholder="Новый аватар" required />
        <span className="popup__error" id="avatar-link-field-error"></span>
      </label>
    </PopupWithForm>
)
};

export default EditAvatarPopup;