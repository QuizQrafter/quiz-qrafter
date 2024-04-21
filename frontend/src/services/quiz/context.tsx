import React, { createContext, useContext, useState } from "react";
import { QuizService } from "./types";

type QuizContextValue = {
  markdown: string | null;
  loading: boolean;
  error: Error | null;
  generateMD: (filename: string) => Promise<void>;
  generatePDF: (filename: string) => Promise<void>;
  downloadMD: (filename: string) => Promise<void>;
  downloadPDF: (filename: string) => Promise<void>;
};

const QuizContext = createContext<QuizContextValue | null>(null);

type QuizProviderProps = {
  service: QuizService;
  children: React.ReactNode;
};

export function QuizProvider({ service, children }: QuizProviderProps) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateMD = async (filename: string) => {
    setLoading(true);
    try {
      const md = await service.generateMD(filename);
      if (!md) throw new Error("No Markdown was generated.");
      setMarkdown(md);
      setError(null);
    } catch (err) {
      console.error("Error generating markdown:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (filename: string) => {
    setLoading(true);
    try {
      const file = await service.generatePDF(filename);
      // Create blob link to download
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.hidden = true;
      link.href = url;
      link.setAttribute(
        'download',
        "quiz.pdf",
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      setError(null);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const downloadMD = async (filename: string) => {
    setLoading(true);
    try {
      const md = await service.downloadMD(filename);
      setMarkdown(md);
      setError(null);
    } catch (err) {
      console.error("Error downloading markdown:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (filename: string) => {
    setLoading(true);
    try {
      const file = await service.downloadPDF(filename);;
      // Create blob link to download
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.hidden = true;
      link.href = url;
      link.setAttribute(
        'download',
        "quiz.pdf",
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      setError(null);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuizContext.Provider value={{ markdown, loading, error, generateMD, generatePDF, downloadMD, downloadPDF }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizAPI() {
  const quizAPI = useContext(QuizContext);
  if (!quizAPI) {
    throw new Error("useQuizAPI must be used within a QuizProvider.");
  }
  return quizAPI;
}
