import React, { createContext, useContext, useState } from "react";
import { QuizService } from "./types";

type QuizContextValue = {
  markdown: string | null;
  loading: boolean;
  error: Error | null;
  generateMD(filename: string): void;
  generatePDF(filename: string): void;
  downloadMD(filename: string): void;
  downloadPDF(filename: string): void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

type QuizProviderProps = {
  service: QuizService;
  children: React.ReactNode;
};

export function DocumentProvider({ service, children }: QuizProviderProps) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateMD = (filename: string) => {
    setLoading(true);
    service
      .generateMD(filename)
      .then((md) => {
        setError(null);
        setMarkdown(md);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };
  const generatePDF = (filename: string) => {
    setLoading(true);
    service
      .generatePDF(filename)
      .then((file) => {
        setError(null);
        window.location.assign(URL.createObjectURL(file));
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };
  const downloadMD = (filename: string) => {
    setLoading(true);
    service
      .downloadMD(filename)
      .then((md) => {
        setError(null);
        setMarkdown(md);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };
  const downloadPDF = (filename: string) => {
    setLoading(true);
    service
      .downloadPDF(filename)
      .then((file) => {
        setError(null);
        window.location.assign(URL.createObjectURL(file));
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <QuizContext.Provider
      value={{
        markdown,
        loading,
        error,
        generateMD,
        generatePDF,
        downloadMD,
        downloadPDF,
      }}
      children={children}
    />
  );
}

export function useQuizAPI() {
  const quizAPI = useContext(QuizContext);
  if (quizAPI === null)
    throw new Error(
      "useQuizAPI() may only be used within the context of a <QuizProvider> component.",
    );
  return quizAPI;
}
