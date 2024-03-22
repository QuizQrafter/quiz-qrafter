import React from "react";
import { useAuth } from "../../services/auth";
import "./dashboard.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import sbStyle from "../../components/Sidebar/sidebar.module.css";

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      {/* <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Logout</button> */}
      <div className = {sbStyle.sidebar}><Sidebar /></div>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
