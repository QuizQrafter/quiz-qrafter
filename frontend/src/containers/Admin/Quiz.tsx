import React, { useState } from 'react';
import { useDocumentAPI } from '../../services/document/context';
import styles from './admin.module.css';

const Quiz = () => {
  const [file, setFile] = useState<File | null>(null);
  const { upload, loading, error } = useDocumentAPI();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    
    upload(file);
  };

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>Quiz Area</h2>
      <p>Welcome to the Quiz room. Start Crafting!</p>
      <form className={styles.quizForm} onSubmit={handleSubmit}>
        <label htmlFor="quizFile" className={styles.quizFileInputLabel}>
          Choose a file
        </label>
        <input
          id="quizFile"
          type="file"
          name="quizFile"
          className={styles.quizFileInput}
          onChange={handleFileChange}
          accept=".pdf, .docx, .txt"
        />
        <button type="submit" className={styles.quizSubmitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Quiz'}
        </button>
      </form>
      {error && <p className={styles.errorText}>Error: {error.message}</p>}
    </div>
  );
};

export default Quiz;
