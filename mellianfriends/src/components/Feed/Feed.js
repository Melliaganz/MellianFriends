import React from 'react'
import FeedPost from './FeedPost';
import FeedContent from './FeedContent';
import Rightbar from '../Rightbar/Rightbar';

function Feed() {
  return (
    <div className='fullcontainerAccueil'>
      
    <div className='FriendsContainerList'>
      <React.Fragment>
          <Rightbar />
        </React.Fragment>
    </div>
    <div className='feedContainer'>
        <React.Fragment >
        <FeedPost />
        </React.Fragment>
        <React.Fragment>
            <FeedContent />
            <FeedContent />
            <FeedContent />
            <FeedContent />
        </React.Fragment>
    </div>
    </div>
  )
}

export default Feed