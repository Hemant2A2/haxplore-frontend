// Example snippet in Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  const handleCreateCollage = async () => {
    try {
      const response = await api.post("/collage/create");
      const { collageId } = response.data;
      navigate(`/editor/${collageId}`);
    } catch (error) {
      console.error("Failed to create collage", error);
    }
  };

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <h1>Email: {user?.email}</h1>
      <h1>Dashboard</h1>
      <button onClick={handleCreateCollage}>Create New Collage</button>
      {/* List user's collages here if desired */}
    </div>
  );
};

export default DashBoard;
