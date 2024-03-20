import React, { createContext, useContext, useState } from "react";
import { DocumentService } from "./types";

type DocumentContextValue = {
  loading: boolean;
  error: Error | null;
  upload(file: File): void;
};

const DocumentContext = createContext<DocumentContextValue | null>(null);

type DocumentProviderProps = {
  service: DocumentService;
  children: React.ReactNode;
};

export function DocumentProvider({ service, children }: DocumentProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = (file: File) => {
    setLoading(true);
    service
      .upload(file)
      .then(() => setError(null))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
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
