import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadBytes, ref as storageRef, getDownloadURL, getStorage } from 'firebase/storage'; 
import { TextField, Button } from '@mui/material';

function PostForm({ onSubmit, firestore, auth }) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postsCollection = collection(firestore, 'posts');
      let fileUrl = '';

      if (file) {
        const storage = getStorage();
        const fileRef = storageRef(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
      }

      await addDoc(postsCollection, {
        userId: auth.currentUser.uid,
        content: content,
        fileUrl: fileUrl,
        type: file ? (file.type.startsWith('image') ? 'image' : 'video') : 'text',
        createdAt: serverTimestamp()
      });

      setContent('');
      setFile(null);
      onSubmit();
      setFile(null);

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='formPost'>
      <TextField
        label="Publier quelque chose..."
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*, video/*" />
      <Button type="submit" variant="contained" color="primary">Publier</Button>
    </form>
  );
}

export default PostForm;
