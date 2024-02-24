import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import SignIn from "./containers/Auth/SignIn";
import SignUp from "./containers/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { useAuth } from "./services/auth";

function App() {
  const { authenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/dashboard" /> : <SignIn />}
        />

        {/* Redirect to dashboard if user is logged in */}
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Add other protected routes here */}
        {/* Default to home if no other routes match */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
