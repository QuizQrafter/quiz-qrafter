import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./services/auth";
import { LocalStorageAuthService } from "./services/auth/localStorageAuthService";
// import { QuizQrafterAuthService } from "./services/auth/quizQrafterAuthService";
import { ThemeProvider } from "./containers/Admin/ThemeContext";
import { DocumentProvider } from "./services/document/context";
import { LocalStorageDocumentService } from "./services/document/localStorageDocumentService";
// import { QuizQrafterDocumentService } from "./services/document/quizQrafterDocumentService";
import { QuizProvider } from "./services/quiz/context";
import { QuizQrafterQuizService } from "./services/quiz/quizQrafterQuizService";

const { VITE_API_URL = "http://localhost:8080" } = import.meta.env;
const apiURL = new URL(VITE_API_URL);

// const authService = new QuizQrafterAuthService(apiURL);
const authService = new LocalStorageAuthService();
// const documentService = new QuizQrafterDocumentService(apiURL);
const documentService = new LocalStorageDocumentService(authService);
const quizService = new QuizQrafterQuizService(apiURL);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider service={authService}>
      <DocumentProvider service={documentService}>
        <QuizProvider service={quizService}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QuizProvider>
      </DocumentProvider>
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
