import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Image Collage Creator</h1>
      <nav className="space-x-4">
        <Link to="/editor" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Start Editing
        </Link>
        <Link to="/collaboration" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Collaborate
        </Link>
      </nav>
    </div>
  );
};

export default Home;
