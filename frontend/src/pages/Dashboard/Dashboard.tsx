import React from "react";
import { useAuth } from "../../services/auth";
import "./dashboard.module.css";

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Logout</button>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
