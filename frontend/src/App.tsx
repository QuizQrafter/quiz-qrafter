import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./containers/Auth/Login";
import SignUp from "./containers/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { useAuth } from "./services/auth";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import UpdatePassword from "./containers/Auth/UpdatePassword";

function App() {
  const { authenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/dashboard" /> : <Login />}
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
