import React, { useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Collaboration from "./Collaboration";
import ExportButton from "../components/ExportButton";
import VersionHistory from "./VersionHistory";
import ImageUpload from "../components/ImageUpload";

const Editor: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [versions, setVersions] = useState<string[]>([]);
  const [revertedImage, setRevertedImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const handleUpload = (images: string[]) => {
    // Handle uploaded images to add to the collage.
    // implement logic here to add the images as Konva.Image shapes
    // or update state to render them in the canvas.
  };

  const handleSaveVersion = () => {
    // Export the current state of the stage as a PNG data URL.
    const uri = stageRef.current?.toDataURL();
    if (uri) {
      setVersions((prevVersions) => [...prevVersions, uri]);
    }
  };

  const handleRevert = (version: string) => {
    // Create a new image from the version data URL.
    const image = new window.Image();
    image.src = version;
    image.onload = () => {
      // Instead of drawing directly on the canvas, set the image in state.
      // This image will be rendered as a KonvaImage shape.
      setRevertedImage(image);
    };
  };

  return (
    <div className="flex h-screen">
      {/* Version History Sidebar */}
      {showHistory && (
        <VersionHistory versions={versions} onRevert={handleRevert} />
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Version History
          </button>
          <button
            onClick={handleSaveVersion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Version
          </button>
          <ExportButton stageRef={stageRef} />
        </div>

        {/* Image Upload */}
        <ImageUpload onUpload={handleUpload} />

        {/* Collaboration and Canvas Area */}
        <div className="flex-1 relative bg-white">
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            ref={stageRef}
          >
            <Layer>
              {/* Render the reverted image if available */}
              {revertedImage && (
                <KonvaImage image={revertedImage} x={0} y={0} />
              )}
              {/* Render other collaboration components or shapes */}
              <Collaboration />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default Editor;
