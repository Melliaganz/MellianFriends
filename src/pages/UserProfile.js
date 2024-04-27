import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import ppDefaut from "../img/41666.png";

function Profile({ auth, firestore }) {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true); // Ajout d'un état de chargement pour les données utilisateur
  const [loadingPosts, setLoadingPosts] = useState(true); // Ajout d'un état de chargement pour les posts
  const [errorUser, setErrorUser] = useState(null); // Ajout d'un état pour les erreurs utilisateur
  const [errorPosts, setErrorPosts] = useState(null); // Ajout d'un état pour les erreurs de posts

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const userDocRef = doc(firestore, 'users', userId);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            setUserData(userDocSnapshot.data());
          } else {
            setErrorUser('Document utilisateur non trouvé.')
            console.log(userDocRef._key.path.segments.users);
          }
        } else {
          setErrorUser('Utilisateur non connecté.');
        }
        setLoadingUser(false); // Mettre fin au chargement une fois que les données utilisateur sont récupérées ou qu'une erreur est survenue
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setErrorUser('Erreur lors de la récupération des données utilisateur.');
        setLoadingUser(false); // Mettre fin au chargement en cas d'erreur
      }
    };

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(firestore, 'posts');
        const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        setLoadingPosts(false); // Mettre fin au chargement une fois que les posts sont récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
        setErrorPosts('Erreur lors de la récupération des posts.');
        setLoadingPosts(false); // Mettre fin au chargement en cas d'erreur
      }
    };

    fetchUserData();
    fetchPosts();
  }, [auth, firestore]);

  return (
    <div className="profileContainer">
      <h2>Profil Utilisateur</h2>
      {loadingUser ? (
        <p>Chargement des données utilisateur...</p>
      ) : errorUser ? (
        <p>Erreur: {errorUser}</p>
      ) : (
        <div className="userData">
          <img src={userData?.profilePicture ? userData.profilePicture : ppDefaut} alt="profilePicture"/>
          <p><strong>Prénom:</strong> {userData?.firstName}</p>
          <p><strong>Nom:</strong> {userData?.lastName}</p>
        </div>
      )}

      {/* Affichage des posts */}
      {loadingPosts ? (
        <p>Chargement des posts...</p>
      ) : errorPosts ? (
        <p>Erreur: {errorPosts}</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            {/* Afficher le contenu du post ici */}
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
