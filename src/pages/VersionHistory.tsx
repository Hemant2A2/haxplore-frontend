import React, { useState } from "react";

interface VersionHistoryProps {
  versions: string[];
  onRevert: (version: string) => void;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ versions, onRevert }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-500 text-white py-1 px-3 rounded"
      >
        {isOpen ? "Hide History" : "Show Version History"}
      </button>

      {isOpen && (
        <div className="mt-2 border p-2 rounded bg-gray-50">
          {versions.map((version, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <span className="text-sm">Version {index + 1}</span>
              <button
                onClick={() => onRevert(version)}
                className="bg-red-400 text-white py-1 px-2 rounded"
              >
                Revert
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionHistory;
