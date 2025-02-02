import React, { useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Collaboration from "./Collaboration";
import ExportButton from "../components/ExportButton";
import VersionHistory from "./VersionHistory";
import ImageUpload from "../components/ImageUpload";
import { useWebSocket } from "../contexts/WebSocketContext";

const Editor: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [versions, setVersions] = useState<string[]>([]);
  const [revertedImage, setRevertedImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const { sendMessage } = useWebSocket();

  // const handleSaveVersion = () => {
  //   const uri = stageRef.current?.toDataURL();
  //   if (uri) {
  //     setVersions((prevVersions) => [...prevVersions, uri]);
  //   }
  // };

  // const handleRevert = (version: string) => {
  //   const image = new window.Image();
  //   image.src = version;
  //   image.onload = () => {
  //     setRevertedImage(image);
  //   };
  // };

  // When an image is uploaded, broadcast it via WebSocket.
  const handleUpload = (images: string[]) => {
    if (images.length > 0) {
      // For example, take the first uploaded image.
      const imageUrl = images[0];
      // Broadcast the new image addition so that CollageEditor (and others) update in real time.
      sendMessage({ type: "addImage", src: imageUrl });
      // Optionally, you can also update local state here if needed.
      console.log("New image uploaded:", imageUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Collage Editor</h1>
      </header>

      <div className="flex flex-1">
        {showHistory && (
          <aside className="w-1/4 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <VersionHistory versions={versions} onRevert={(version) => {
              const image = new window.Image();
              image.src = version;
              image.onload = () => setRevertedImage(image);
            }} />
          </aside>
        )}

        <main className="flex-1 flex flex-col">
          <div className="flex flex-wrap items-center justify-between bg-white p-4 border-b border-gray-200 shadow-sm">
            <div className="flex space-x-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Version History
              </button>
              <button
                onClick={() => {
                  const uri = stageRef.current?.toDataURL();
                  if (uri) setVersions((prev) => [...prev, uri]);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Save Version
              </button>
              <ExportButton stageRef={stageRef} />
            </div>
            <div>
              <ImageUpload onUpload={handleUpload} />
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex items-center justify-center bg-gray-100">
              <Stage
                width={window.innerWidth * 0.7}
                height={window.innerHeight * 0.8}
                ref={stageRef}
                className="shadow-lg border border-gray-300 bg-white"
              >
                <Layer>
                  {revertedImage && (
                    <KonvaImage image={revertedImage} x={0} y={0} />
                  )}
                </Layer>
              </Stage>
            </div>
            <aside className="w-1/3 bg-white border-l border-gray-200 p-4 overflow-y-auto">
              <Collaboration />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Editor;
