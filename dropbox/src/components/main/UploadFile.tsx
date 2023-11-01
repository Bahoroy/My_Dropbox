import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore, storage } from '../../fbase/firebase';
import { useNavigate } from 'react-router-dom';

const UploadFile = ({ user }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `files/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      const fileData = {
        name: file.name,
        url: downloadURL,
        createdAt: serverTimestamp(),
        userId: user.uid,
      };

      await addDoc(collection(firestore, 'files'), fileData);

      navigate('/');
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-4">Upload File</h2>
  <div className="flex items-center mb-4">
    <label htmlFor="file-upload" className="mr-2">Select file:</label>
    <input id="file-upload" type="file" className="border border-gray-300 py-1 px-3 rounded-lg" onChange={handleFileChange} />
  </div>
  {uploading && <p className="text-sm mb-2">Uploading: {uploadProgress}%</p>}
  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleUpload} disabled={uploading || !file}>
    Upload
  </button>
</div>

  );
};

export default UploadFile;
