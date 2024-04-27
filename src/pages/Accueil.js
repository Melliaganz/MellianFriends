import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import PostForm from './postForm';
import { Clear } from '@mui/icons-material';
import { Button } from '@mui/material';

function Accueil({ auth, firestore, storage }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(firestore, 'posts');
      const postsQuery = query(postsCollection, orderBy('createdAt', 'desc')); 
      const querySnapshot = await getDocs(postsQuery);
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Une erreur s\'est produite lors de la récupération des posts.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(firestore, 'posts');
        const postsQuery = query(postsCollection, orderBy('createdAt', 'desc')); 
        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Une erreur s\'est produite lors de la récupération des posts.');
        setLoading(false);
      }
    };
  
    fetchPosts(); // Appeler la fonction fetchPosts directement ici
  
  }, [firestore]); // Firestore reste la seule dépendance

  const handleNewPost = async () => {
    // Mettre à jour les posts après avoir ajouté un nouveau post
    await fetchPosts();
  };

  const handleDeletePost = async (postId, fileName) => {
    try {
      // Obtenir une référence au document du post
      const postRef = doc(firestore, 'posts', postId);
  
      // Supprimer le post de la base de données
      await deleteDoc(postRef);
  
      // Supprimer le fichier associé du stockage si nécessaire
      if (fileName) {
        const fileRef = ref(storage, `files/${fileName}`);
        await deleteObject(fileRef);
      }
  
      // Mettre à jour les posts après suppression
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  return (
    <div className='postFeedContainer'>
      {/* Afficher le formulaire de création de post */}
      <PostForm onSubmit={handleNewPost} firestore={firestore} storage={storage} auth={auth} />

      {/* Afficher les posts */}
      { loading ? <div>Chargement des Posts</div> : 
        error ? <div>Erreur: {error}</div> :
        <div className='postInterieurContainer'>
          {posts.map(post => (
            <div className='postInterieur' key={post.id}>
              {/* Afficher le bouton de suppression si l'utilisateur est le créateur du post */}
              <div className='postDescription'>
                <p>{post.content}  {auth.currentUser && post.userId === auth.currentUser.uid && (
                  <Button onClick={() => handleDeletePost(post.id, post.fileName)}><Clear/></Button>
                )}</p>
              </div>
              {/* Afficher l'image si le post est une image */}
              {post.type === 'image' && <img src={post.fileUrl} alt="Post" />}

              {/* Afficher la vidéo si le post est une vidéo */}
              {post.type === 'video' && (
                <video controls>
                  <source src={post.fileUrl} type="video/mp4" />
                  Le format uploadé n'est pas supporté
                </video>
              )}
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default Accueil;
