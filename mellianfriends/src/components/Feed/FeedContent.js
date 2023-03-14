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
import PostComment from './postComment';

const FeedContent = ({ ...post}) => {
    const [postPic, setPostPic] = useState(null);
    const onClickDeletePost = (e) => {
        e.preventDefault();
        if(window.confirm("Voulez vous vraiment supprimer ce post ?")){
          deleteOnePost(post.id) 
          post.onErase() 
        }
      };

  return (
    <div className='cardFeedContainer'>
        
            <div className='cardFeedTitleContainer'>
                <div className='cardFeedTitleProfil'>
                <a href={"/account/" + post.User.id} alt="Profil">
                    <img src={post.User.profilePic} crossOrigin="anonymous" alt="Profil" title="Profil" height={50} width={50}/>
                </a>
                <div className='titleInfoCardHeader'>
                    <a href={"/account/" + post.User.id} alt="Profil du post" title={"Compte de" + post.User.name + (" ") + post.User.surname}>
                <p>{post.User.name} {post.User.surname} </p>
                </a>
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
                 <a href={"/posts/" + post.id} alt="post">                         
                <button type="comment" aria-labelledby='Commentaires' title="Commentez"><ChatRoundedIcon />Commenter !</button>
                </a>
                </div>
                 <div className='shareButton'>   
                <button type="share" aria-labelledby='Partage' title="Partagez"><ShareRoundedIcon/> Partager !</button>
                </div>
            </div>
        </div>
        </div>
  )
}

export default FeedContent