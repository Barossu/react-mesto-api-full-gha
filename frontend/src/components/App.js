import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import api from '../utils/Api.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom'
import InfoTooltip from './InfoTooltip.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, cardInfo: {}});
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''})
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('')
  const [isRegister, setIsRegister] = React.useState({register: false, text: ''})
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      api.getProfileInfo()
        .then(profileInfo => {
          setCurrentUser(profileInfo)
        })
        .catch(console.error)
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then(res => setCards(res))
        .catch(console.error)
    }
  }, [loggedIn])

  function verificationOfRegistration(data){
    setIsTooltipPopupOpen(true)
    if (data){
      setIsRegister({register: true, text: 'Вы успешно зарегистрировались!'})
    } else {
      setIsRegister({register: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'})
    }

  }

  function handleRegister(password, email){
    auth.register(password, email)
      .then((data) => {
        verificationOfRegistration(data.email)
        if (data){
          navigate('/signin', {replace: true})
        }
      })
      .catch((data) => {
        verificationOfRegistration(data.email);
        console.error(data)
      })
  }

  function handleTokenCheck(){
    const token = localStorage.getItem('token')
    if (token){
      auth.checkToken(token)
        .then((res) => {
          if (res){
            setLoggedIn(true);
            setUserEmail(res.email)
            navigate('/main', {replace: true})
          }
        })
        .catch(console.error)
    }
  }

  function handleSignOut(){
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id)
    api.toggleLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      }).catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c !== card))
    }).catch(console.error)
  }

  function handleCardClick(cardInfo){
    setSelectedCard({isOpen: true, cardInfo: cardInfo});
  };

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  };
  
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  };
  
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups(){
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({isOpen: false, cardInfo: {}});
  };

  function handleUpdateUser(name, description){
    api.patchProfileInfo(name, description).then((profileInfo) => {
      setCurrentUser(profileInfo);
      closeAllPopups();
    }).catch(console.error)
  };

  function handleUpdateAvatar(avatarLink){
    api.patchProfileAvatar(avatarLink).then((profileInfo) => {
      setCurrentUser(profileInfo);
      closeAllPopups();
    }).catch(console.error)
  };

  function handleAddPlace(name, link){
    api.postNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    }).catch(console.error)
  }

  function handleLogin(){
    setLoggedIn(true)
  };

  return ( 
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        
        <Header userEmail={userEmail} loggedIn={loggedIn} handleSignOut={handleSignOut} />

        <Routes>
          <Route path='/' element={!loggedIn ? <Navigate to='/signin' replace/> : <Navigate to='/main' replace/>} />
          <Route path='/main' element={<ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />} />
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />  
          <Route path='/signin' element={<Login handleLogin={handleLogin} checkRegister={verificationOfRegistration} />} />
        </Routes>

        {loggedIn && <Footer/>}

        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />

        <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />

        <AddPlacePopup onAddPlace={handleAddPlace} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />

        <PopupWithForm name='removeCard' title='Вы уверены?' buttonText='Да' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip name='infoTooltip' onClose={closeAllPopups} isOpen={isTooltipPopupOpen} isRegister={isRegister} />

      </CurrentUserContext.Provider>

    </div>

  )
}


export default App;
