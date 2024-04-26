import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Brightness4, Brightness7, Logout } from '@mui/icons-material'; // Importe les icônes pour le mode sombre
import logo from "../img/logo.png"

function Header({ user, handleLogout, toggleDarkMode, darkMode }) {
  return (
    <header className='headerContainer'>
      <div className="logo">
        <img src={logo} alt="logo" width={25} height={25} />
      </div>
      <div className="home-button">
      {user && (
        <div className="menu">
          <button onClick={handleLogout}><Logout /></button>
          <Link to="/profile">Profil</Link>
          {/* Ajoute ici le menu pour accéder aux options de profil */}
        </div>
      )}
        <button onClick={toggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />} {/* Affiche l'icône en fonction du mode sombre */}
        </button>
        <Link to="/">
          <button><Home /></button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
