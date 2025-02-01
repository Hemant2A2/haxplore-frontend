import React from "react";
import Konva from "konva"; // Import the default export from konva

interface ExportButtonProps {
  stageRef: React.RefObject<Konva.Stage>; // Use Konva.Stage as the type
}

const ExportButton: React.FC<ExportButtonProps> = ({ stageRef }) => {
  const handleExport = () => {
    // Directly call toDataURL() on the Konva Stage instance.
    const uri = stageRef.current?.toDataURL();
    const link = document.createElement("a");
    link.download = "collage.png";
    link.href = uri || "";
    link.click();
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 text-white py-2 px-4 rounded mt-2"
    >
      Export as PNG
    </button>
  );
};

export default ExportButton;
