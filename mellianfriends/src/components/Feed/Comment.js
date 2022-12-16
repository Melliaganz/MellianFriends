import ThumbUpOffAltRounded from '@mui/icons-material/ThumbUpOffAltRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react'
import ClearRounded from '@mui/icons-material/ClearRounded';

const Comment = ({...comment}) => {
    const onClickDeleteComment = (e) => {
        e.preventDefault();
        if (window.confirm("Voulez vous vraiment supprimer ce commentaire ?")){
            deleteOneComment(comment.id)
            comment.onErase()
        }
    };


  return (
    <div className='blockCommentContainer'>
            <div className='commentPostedProfil'>
                <div className='imageCommentPostedProfil'>
                <a href="/profil/:id" alt="Profil" title="Profil">
                <img src={profil} alt="Profil" height={35}></img>
                </a>
                </div>
                <div className='textCommentPostedProfil'>
                <a href="/profil/:id" alt="Profil" title="Profil">Lengrand Lucas</a>
                </div>
            </div>
            <div className='commentPostedContent'>
                <p>{comment.text}</p>
            </div>
            <div className='likeComments'>
                <button type="like">
                    <ThumbUpOffAltRounded/> J'aime
                </button>
                <button type="Answer">
                    Répondre
                </button>
            </div>
            <div className='postedAtComments'>
                {" "}
                <AccessTimeIcon />
                {" " + globalFunctions.convertDateForHuman(comment.createdAt)}
            </div>
            {comment.canEdit === true && (
                <button className='buttonSupprimerComment' onClick={onClickDeleteComment} >
                    <ClearRounded /> Supprimer
                </button>
            )}
            <div className='seeMoreComments'>
                <button type="seemore" >Voir plus de réponses</button>
            </div>
            </div>
  )
}

export default Comment