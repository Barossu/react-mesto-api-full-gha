import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e){
    setName(e.target.value);
  };

  function handleDescriptionChange(e){
    setDescription(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();
    onUpdateUser(name, description)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])


  return(
    <PopupWithForm name='editProfile' title='Редактировать профиль' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>       
      <label className="popup__input-container">
        <input onChange={handleNameChange} value={name} type="text" name="name-field" className="popup__input popup__input_type_name" placeholder="Введите имя" required minLength="2" maxLength="40" />
        <span className="popup__error" id="name-field-error"></span>
      </label>
      <label className="popup__input-container"> 
        <input onChange={handleDescriptionChange} value={description} type="text" name="description-field" className="popup__input popup__input_type_description" placeholder="О себе" required minLength="2" maxLength="200" />
        <span className="popup__error" id="description-field-error"></span>
      </label>
    </PopupWithForm>
)
};

export default EditProfilePopup;