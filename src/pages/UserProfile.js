import React from 'react'

function UserProfile({auth, user, firestore}) {
    console.log('mes couilles',firestore)
  return (
    <div><span>{user.firstName} {user.lastName}</span> </div>

  )
}

export default UserProfile
