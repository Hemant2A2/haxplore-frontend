// Collaboration.tsx
import React from "react";
import CollageEditor from "../components/CollageEditor";

const Collaboration: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Collaboration Collage Editor
      </h3>
      <CollageEditor />
    </div>
  );
};

export default Collaboration;
