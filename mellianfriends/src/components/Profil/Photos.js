import React from 'react'
import photo1 from "../../images/Lucas (1).jpg";
import photo2 from "../../images/Lucas (2).jpg";
import photo3 from "../../images/Lucas (3).jpg";
import photo4 from "../../images/Lucas (4).jpg";
import photo5 from "../../images/Lucas (5).jpg";
import photo6 from "../../images/Lucas (6).jpg";
import photo7 from "../../images/Lucas (7).jpg";
import photo8 from "../../images/Lucas (8).jpg";



function Photos() {
  return (
    <div className='photosContainer'>
        <div className='photosCardTitle'>
            <h3>Photos</h3>
            <a href="profile/photos" alt="Photos">Toutes les photos</a>
        </div>
        <div className="photosContainer">
            <a href="profile/photos/:id" alt="photo">
                <img src={photo1} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo2} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo3} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo4} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo5} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo6} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo7} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a>
            <a href="profile/photos/:id" alt="photo">
                <img src={photo8} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a> 
            <a href="profile/photos/:id" alt="photo">
                <img src={photo8} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a> 
            <a href="profile/photos/:id" alt="photo">
                <img src={photo8} alt="photos" title="Voir en grand" height={127.31} width={127.31}></img>
            </a> 
        </div>
    </div>
  )
}

export default Photos