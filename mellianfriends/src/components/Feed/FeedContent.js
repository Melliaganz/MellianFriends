import React from 'react'
import PostImage from "../../images/60491199_10216227584233677_1893297729551990784_n.jpg"
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import profil from "../../images/Portrait.jpg"
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

function FeedContent() {
  return (
    <div className='cardFeedContainer'>
            <div className='cardFeedTitleContainer'>
                <div className='cardFeedTitleProfil'>
                <a href="/profil:id" alt="Profil">
                    <img src={profil} alt="Profil" title="Profil" height={45}/>
                </a>
                <p>Lucas Lengrand <br /> 55min ago </p>
                </div>
                <div className='cardFeedOption'>
                   <button aria-labelledby='Options du post' title="Options"> <MoreHorizRoundedIcon /> </button>
                   <button aria-labelledby='Supprimer le post' title="Supprimer"> <ClearRoundedIcon /></button>
                </div>
            </div>
            <div className='cardFeedContentContainer'>
                <div className='contentText'>
                <p>Coucou les loulous petit post sur it's Always Sunny In Philadelphia hihi</p>
                </div>
                <div className='contentImg'>
                <a href="../../images/60491199_10216227584233677_1893297729551990784_n.jpg" alt="lien image">
                <img src={PostImage} alt="Post"></img>
                </a>
                </div>
            </div>
            <div className='cardFeedBottomContainer'>
            <div className='reactFeedButton'>
                 <div className='likeButton'>                                    
                <button type="like" aria-labelledby="like" title="J'aime"><ThumbUpOffAltRoundedIcon /> J'aime !</button>
                </div>
                 <div className='commentButton'>                      
                <button type="comment" aria-labelledby='Commentaires' title="Commentez"><ChatRoundedIcon />Commentez !</button>
                </div>
                 <div className='shareButton'>   
                <button type="share" aria-labelledby='Partage' title="Partagez"><ShareRoundedIcon/> Partagez !</button>
                </div>
            </div>
            <div className='commentContainer'>
                <a href="/profil:id" alt="Profil">
                    <img src={profil} alt="Profil" title="Profil" height={35}></img>
                </a>
                <input type="text" placeholder='écrivez un commentaire...'></input>
            </div>
            <div className='blockCommentContainer'>
            <div className='commentPostedProfil'>
                <div className='imageCommentPostedProfil'>
                <a href="/profil/:id" alt="Profil" title="Profil">
                <img src={profil} alt="Profil" height={35}></img>
                </a>
                </div>
                <div className='textCommentPostedProfil'>
                <a href="/profil/:id" alt="Profil" Title="Profil">Lengrand Lucas</a>
                </div>
            </div>
            <div className='commentPostedContent'>
                <p>j'aime vraiment bien ce post il me fait réfléchir aux inégalité de la vie et aussi a la teub de jacques chirac</p>
            </div>
            <div className='likeComments'>
                <button type="like">
                    J'aime
                </button>
                <button type="Answer">
                    Répondre
                </button>
            </div>
            </div>
            <div className='seeMoreComments'>
                <button type="seemore" >Voir plus de réponses</button>
            </div>
        </div>
        </div>
  )
}

export default FeedContent