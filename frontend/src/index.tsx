import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./services/auth";
// import { LocalStorageAuthService } from "./services/auth/localStorageAuthService";
import { QuizQrafterAuthService } from "./services/auth/quizQrafterAuthService";
import { DocumentProvider } from "./services/document/context";
// import { LocalStorageDocumentService } from "./services/document/localStorageDocumentService";
import { QuizQrafterDocumentService } from "./services/document/quizQrafterDocumentService";

const { REACT_APP_API_URL = "http://localhost:8080" } = process.env;
const apiURL = new URL(REACT_APP_API_URL);

const authService = new QuizQrafterAuthService(apiURL);
const documentService = new QuizQrafterDocumentService(apiURL);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider service={authService}>
      <DocumentProvider service={documentService}>
        <App />
      </DocumentProvider>
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
