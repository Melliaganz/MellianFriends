import React, { useState } from 'react'
import globalFunctions from "../../_utils/_functions"
import { deleteOnePost } from "../../_utils/posts/posts.functions"
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import profil from "../../images/Portrait.jpg"
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FeedContent = ({ ...post}) => {
    const [profilePic, setProfilePic] = useState(null);
    const [postPic, setPostPic] = useState(null);
    const onClickDeletePost = (e) => {
        e.preventDefault();
        window.location.reload();
        if(window.confirm("Voulez vous vraiment supprimer ce message ?")){
            deleteOnePost(post.id)
            post.OnErase()
        }
    };

  return (
    <div className='cardFeedContainer'>
            <div className='cardFeedTitleContainer'>
                <div className='cardFeedTitleProfil'>
                <a href="/account/:id" alt="Profil">
                    <img src={profilePic ? post.profilePic : ("https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg")} alt="Profil" title="Profil" height={45}/>
                </a>
                <div className='titleInfoCardHeader'>
                <p>{post.User.name} {post.User.surname} </p>
                <p className='hourAndDate'><AccessTimeIcon /> {" " + globalFunctions.convertDateForHuman(post.createdAt)}</p>
                </div>
                </div>
                <div className='cardFeedOption'>
                   <button aria-labelledby='Options du post' title="Options"> <MoreHorizRoundedIcon /> </button>
                   {post.canEdit === true && (
                    <button aria-labelledby='Supprimer le post' title="Supprimer" href="/" onClick={onClickDeletePost}> <ClearRoundedIcon /></button>
                   )}
                   
                </div>
            </div>
            <div className='cardFeedContentContainer'>
                <div className='contentText'>
                {post.teaserPost ? (
                    <p>{post.content}</p>
                ) : (
                    <p>{post.content}</p>
                )}
                </div>
                <div className='contentImg'>
                    {postPic ? 
                <a href="/" alt="lien image">
                <img src={post.imageUrl} alt="Post"></img>
                </a> : null
                    }
                </div>
            </div>
            <div className='cardFeedBottomContainer'>
            <div className='reactFeedButton'>
                 <div className='likeButton'>                                    
                <button type="like" aria-labelledby="like" title="J'aime"><ThumbUpOffAltRoundedIcon /> J'aime !</button>
                </div>
                 <div className='commentButton'>                      
                <button type="comment" aria-labelledby='Commentaires' title="Commentez"><ChatRoundedIcon />Commenter !</button>
                </div>
                 <div className='shareButton'>   
                <button type="share" aria-labelledby='Partage' title="Partagez"><ShareRoundedIcon/> Partager !</button>
                </div>
            </div>
            <div className='commentContainer'>
                <a href="/profil:id" alt="Profil">
                    <img src={profil} alt="Profil" title="Profil" height={35}></img>
                </a>
                <input type="text" placeholder='écrivez un commentaire...'></input>
            </div>
        </div>
        </div>
  )
}

export default FeedContent