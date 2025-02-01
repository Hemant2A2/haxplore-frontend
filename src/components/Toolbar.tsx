import React, { useState } from "react";

interface ToolbarProps {
  onAddText: (text: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddText }) => {
  const [text, setText] = useState("");

  return (
    <div className="bg-gray-200 p-4 flex gap-4">
      {/* Add Text */}
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border px-2 py-1"
      />
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded"
        onClick={() => onAddText(text)}
      >
        Add Text
      </button>
    </div>
  );
};

export default Toolbar;
