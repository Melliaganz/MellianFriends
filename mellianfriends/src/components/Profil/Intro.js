import React from 'react'

function Intro() {
  return (
    <div className='introBlockContainer'>
      <div className='titreBlockIntroContainer'>
        <h3 className='titreIntro'>Intro</h3>
      </div>
      <div className='introText'>
        <p className='introTextP' contentEditable> Bonjour bienvenue sur mon compte Mellianfriends</p>
      </div>
      <div className='modifyBioButton'>
        <button type='modify' className='modifyBioButtonB'> Modifier les infos</button>
      </div>
    </div>
  )
}

export default Intro