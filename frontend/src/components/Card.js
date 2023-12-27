import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props){

  function handleClick(){
    props.onCardClick(props.card)
  };

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function hendleDeleteCard() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(item => item._id === currentUser._id)
  const cardLikeButtonClassName = (`elements__like ${isLiked && 'elements__like_active'}`)

  return (
    <>
      <img onClick={handleClick} className="elements__image" src={props.card.link} alt={`Изображение: ${props.card.name}`} />
      { isOwn && <button onClick={hendleDeleteCard} type="button" className="elements__remove-button" aria-label="Удалить" name="remove-button" />}
      <div className="elements__info">
        <h2 className="elements__place">{props.card.name}</h2>
        <div className="elements__like-container">
          <button onClick={handleLikeClick} type="button" name="like-button" aria-label="Лайк" className={cardLikeButtonClassName}></button>
          <p className="elements__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </>
  )
}

export default Card;