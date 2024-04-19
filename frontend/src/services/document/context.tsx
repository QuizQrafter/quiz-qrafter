import React, { createContext, useContext, useState } from "react";
import { DocumentService } from "./types";

type DocumentContextValue = {
  loading: boolean;
  error: Error | null;
  upload: (file: File) => Promise<void>;
};

const DocumentContext = createContext<DocumentContextValue | null>(null);

type DocumentProviderProps = {
  service: DocumentService;
  children: React.ReactNode;
};

export function DocumentProvider({ service, children }: DocumentProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    try {
      const response = await service.upload(file);
      console.log("Upload successful:", response.quizMarkdown);
      setError(null);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err instanceof Error ? err : new Error("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        loading,
        error,
        upload,
      }}
      children={children}
    />
  );
}

export function useDocumentAPI() {
  const documentAPI = useContext(DocumentContext);
  if (documentAPI === null)
    throw new Error(
      "useDocumentAPI() may only be used within the context of a <DocumentProvider> component.",
    );
  return documentAPI;
}
