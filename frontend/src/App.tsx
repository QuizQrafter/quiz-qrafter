import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './containers/Auth/SignUp';
import SignIn from './containers/Auth/SignIn';
import Home from './pages/Home/Home';
// import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  // const [user, setUser] = useState(null);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Redirect to dashboard if user is logged in */}
        {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> */}
        {/* Add other protected routes here */}
        {/* Default to home if no other routes match */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
          {/* Add other routes here */}
        </Routes>
      </Router>
  );
}

export default App;
