import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

function Profile({ auth, firestore, storage }) {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          // Fetch user data from Firestore
          const userId = auth.currentUser.uid;
          const userDocRef = ref(storage, `profileImages/${userId}`); 
          const userImageUrl = await getDownloadURL(userDocRef);
          setUserData({
            displayName: auth.currentUser.displayName || 'Anon', 
            profilePicture: userImageUrl,
          });
        } else {
          setErrorUser('Utilisateur non connecté.');
        }
        setLoadingUser(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setErrorUser('Erreur lors de la récupération des données utilisateur.');
        setLoadingUser(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(firestore, 'posts');
        const q = query(postsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications:', error);
        setErrorPosts('Erreur lors de la récupération des publications.');
      }
      setLoadingPosts(false);
    };

    fetchUserData();
    fetchPosts();
  }, [auth, firestore, storage]);

  const createProfile = async () => {
    try {
      if (!auth.currentUser) {
        setErrorUser('Utilisateur non connecté.');
        return;
      }

      const userId = auth.currentUser.uid;
      const displayName = auth.currentUser.displayName || 'Anon';
      const profilePicture = null; // Placeholder for default profile picture
      await updateProfile(auth.currentUser, { displayName });

      // Save user data to Firestore
      // Example: await firestore.collection('profiles').doc(userId).set({ displayName, profilePicture });

      setUserData({ displayName, profilePicture });
    } catch (error) {
      console.error('Erreur lors de la création du profil:', error);
      setErrorUser('Erreur lors de la création du profil.');
    }
  };

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profileContainer">
      <h2>Profil Utilisateur</h2>
      {loadingUser ? (
        <p>Chargement...</p>
      ) : errorUser ? (
        <p>Erreur: {errorUser}</p>
      ) : (
        <div className="userData">
          <img src={userData.profilePicture || 'placeholder.png'} alt="Profile" />
          <p><strong>Pseudo:</strong> {userData.displayName}</p>
        </div>
      )}

      {!userData && (
        <div>
          <p>Vous n'avez pas encore créé de profil.</p>
          <button onClick={createProfile}>Créer un profil maintenant</button>
        </div>
      )}

      <h2>Publications</h2>
      {loadingPosts ? (
        <p>Chargement des publications...</p>
      ) : errorPosts ? (
        <p>Erreur: {errorPosts}</p>
      ) : (
        <div className="postInterieur">
          {posts.length === 0 ? (
            <p>Aucune publication disponible.</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post">
                <p>{post.content}</p>
                {post.type === 'image' && <img src={post.fileUrl} alt="Post" />}
                {post.type === 'video' && (
                  <video controls>
                    <source src={post.fileUrl} type="video/mp4" />
                    Le format uploadé n'est pas supporté
                  </video>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
