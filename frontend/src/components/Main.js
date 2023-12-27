import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props){

  const currentUser = React.useContext(CurrentUserContext)

  return(
    <main className="content">

      <section className="profile">
        <button onClick={props.onEditAvatar} type="button" name="edit-avatar-button" aria-label="Изменить" className="profile__avatar-button">
          <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
          <div className="profile__avatar-edit"></div>
        </button>
        <div className="profile__info">
          <div className="profile__data">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="Изменить" name="edit-button"></button>
        </div>
          <button onClick={props.onAddPlace} type="button" name="add-button" aria-label="Добавить" className="profile__add-button"></button>
      </section>

      <section className="elements" aria-label="Карточки с фото">
        {props.cards.map((cardInfo) => (
          <article className="elements__element" key={cardInfo._id}>
            <Card onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} card={cardInfo} />
          </article>
        ))}
      </section>

    </main>
  )
}

export default Main

