import React from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom'
import logoImage from '../images/logo_header.svg';

function Header({userEmail, loggedIn, handleSignOut}) {
  const location = useLocation();
  const [onMenu, setOnMenu] = React.useState(false);

  function handleOnMenuClick(){
    setOnMenu(true);
  };

  function handleOutMenuClick(){
    setOnMenu(false);
  }

  return(
    <header className="header">
      <div className='header__logged'>
        <img className="header__logo" alt="Логотип" src={logoImage} />
        <button onClick={onMenu ? handleOutMenuClick : handleOnMenuClick} type='button' className={`header__button header__button_type_${onMenu ? 'on' : 'off'}`} name="open-menu-button" aria-label="Открыть меню"/>
      </div>
      {(!loggedIn) ?
        <Routes>
          <Route path='/signup' element={<Link className='header__link' to='/signin'>Войти</Link>} />
          <Route path='/signin' element={<Link className='header__link' to='/signup'>Регистрация</Link>} />
        </Routes>
      :
        <div className={`header__container ${!onMenu ? 'header__container_closed' : ''}`}>
          <p className='header__user-email'>{userEmail}</p>
          <Link onClick={handleSignOut} className='header__link header__link_singout' to='/signin'>Выйти</Link>
        </div>
      }
    </header>
  )
};

export default Header;