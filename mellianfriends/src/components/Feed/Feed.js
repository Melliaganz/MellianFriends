import React from 'react'
import FeedPost from './FeedPost';
import FeedContent from './FeedContent';

function Feed() {
  return (
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
  )
}

export default Feed