import React, { useState, useCallback, useEffect } from 'react';
import { useQuizAPI } from '../../services/quiz/context';
import { useDocumentAPI } from '../../services/document/context';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { PulseLoader } from 'react-spinners';
import markdownIt from 'markdown-it';
import styles from './admin.module.css';

const mdParser = markdownIt(/* Markdown-it options */);

const Quiz = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const { upload, loading: uploadLoading, error: uploadError } = useDocumentAPI();
  const { markdown, generateMD, generatePDF, loading: pdfLoading, error: pdfError } = useQuizAPI();
  const [editableMarkdown, setEditableMarkdown] = useState(markdown ?? "");

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  }, []);

  const handleUpload = useCallback(async () => {
    if (file) {
      try {
        await upload(file);
        alert('File uploaded successfully!');
        await generateMD(fileName);
      } catch (err) {
        const error = err as Error;
        alert(`Failed to upload file: ${error.message}`);
      }
    } else {
      alert('Please select a file to upload.');
    }
  }, [file, fileName, upload, generateMD]);

  const handleDownloadPDF = useCallback(async () => {
    if (fileName) {
      console.log({ fileName });
      await generatePDF(fileName);
    } else {
      alert('Please select a file first.');
    }
  }, [fileName, generatePDF]);

  useEffect(() => {
    setEditableMarkdown(markdown ?? "");
  }, [markdown, setEditableMarkdown]);

  const handleEditorChange = ({ html, text }: { html: string, text: string }) => {
    setEditableMarkdown(text);
    // Optionally use HTML for something
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.toolbar}>
        <label className={styles.fileInputLabel}>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            disabled={uploadLoading || pdfLoading}
            accept=".pdf,.docx,.txt"
            style={{ display: 'none' }}
          />
          {uploadLoading || pdfLoading ? <PulseLoader color="#ffffff" size={10} /> : (fileName || 'Choose File')}
        </label>
        <button onClick={handleUpload} disabled={uploadLoading || !file} className={styles.uploadButton}>
          Upload
        </button>
        <button onClick={handleDownloadPDF} disabled={pdfLoading || !editableMarkdown} className={styles.downloadButton}>
          Download PDF
        </button>
      </div>
      <MarkdownEditor
        value={editableMarkdown}
        style={{ height: '500px', width: '100%' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => setEditableMarkdown(text)}
      />
      {uploadError && <p className={styles.errorText}>Upload Error: {uploadError.message}</p>}
      {pdfError && <p className={styles.errorText}>PDF Error: {pdfError.message}</p>}
    </div>
  );
};

export default Quiz;
