import React from 'react'
import ConstructionIcon from '@mui/icons-material/Construction';

function NotFound() {
  return (
    <div className='notFoundContainer'>
      <div className='notFoundInterieur'>
        <h1><ConstructionIcon /></h1>
      </div>
      <div className='notFoundSousTitre'>
      <h2>La page demandé n'existes plus/pas</h2>
      </div>
      <div className='lienRetourAccueil'>
        <a href="/" alt="Accueil">Retour à l'accueil</a>
      </div>
    </div>
  )
}

export default NotFound