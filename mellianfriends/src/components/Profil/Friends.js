import React from 'react'
import copaings1 from "../../images/copaings (1).jpg"
import copaings2 from "../../images/copaings (2).jpg"
import copaings3 from "../../images/copaings (3).jpg"
import copaings4 from "../../images/copaings (4).jpg"
import copaings5 from "../../images/copaings (5).jpg"
import copaings6 from "../../images/copaings (6).jpg"
import copaings7 from "../../images/copaings (7).jpg"
import copaings8 from "../../images/copaings (8).jpg"

function Friends() {
  return (
    <div className='friendsContainer'>
        <div className='friendsCardTitle'>
            <div className='titreEtNombre'>
            <h3> Amis</h3>
            <p className='friendsNumber'> 71 amis</p>
            </div>
            <div className='lienFriendsTitle'>
            <a href="/profile/Friends" alt="Amis" title="Amis">Tous les amis</a>
            </div>
        </div>
        <div className='friendsListContainer'>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings1} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Iscia Ambayrac-Bodi</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings2} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Clémence Lavieille</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings3} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Valentine Barbier</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings4} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Floriane Rivet</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings5} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Zoé Prim</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings6} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Claire Blackthone</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings7} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Lou Moulin</p>
            </div>
            <div>
            <a href="/profile/:id" alt="ProfilAmis">
            <img src={copaings8} alt="Profil" title="Profil de la personne"height={122.64} width={122.64}></img>
            </a>
            <p>Florie Réboul</p>
            </div>
        </div>
    </div>
  )
}

export default Friends