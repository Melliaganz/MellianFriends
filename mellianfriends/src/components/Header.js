import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../img/WIN_20201203_18_47_06_Pro.jpg"

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = (e) => {
      // Effectue les opérations nécessaires pour la déconnexion de l'utilisateur, comme réinitialiser les données, supprimer les tokens, etc.
      // ...
      localStorage.removeItem('isLoggedIn'); // Supprime la clé 'isLoggedIn' du localStorage
      setIsLoggedIn(false); // Met à jour l'état pour indiquer que l'utilisateur est déconnecté
      navigate('/'); // Redirige vers la page de connexion après la déconnexion
      e.preventDefault();
    };
  
    useEffect(() => {
      // Récupère la valeur de isLoggedIn depuis le localStorage
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
      if (storedIsLoggedIn) {
        setIsLoggedIn(JSON.parse(storedIsLoggedIn));
      }
    }, []);
  
    return (
      <header>
        <div className='headerContainer'> 
          <div className='logoSite'>
            <a href="/" alt="accueil">
              <img src={logo} alt="logo" width={"200px"} />
            </a>
          </div>
          <div className='menuHeader'>
            <nav>
              <ul>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/">Accueil</Link>
                    </li>
                    <li>
                      <Link to="/profil">Profil</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}><LogoutIcon /></button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/">Connexion</Link>
                    </li>
                    <li>
                      <Link to="/signup">Inscription</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <Outlet /> {/* Affiche le contenu des routes enfants */}
      </header>
    );
  }
  
  export default Header;
