import React from "react";

interface TextOverlayProps {
  onChangeFont: (font: string) => void;
  onChangeColor: (color: string) => void;
}

const TextOverlay: React.FC<TextOverlayProps> = ({ onChangeFont, onChangeColor }) => {
  return (
    <div className="p-4 bg-gray-200 flex gap-4">
      {/* Font Selector */}
      <select onChange={(e) => onChangeFont(e.target.value)} className="border px-2 py-1">
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier</option>
        <option value="Georgia">Georgia</option>
      </select>

      {/* Color Picker */}
      <input type="color" onChange={(e) => onChangeColor(e.target.value)} />
    </div>
  );
};

export default TextOverlay;
