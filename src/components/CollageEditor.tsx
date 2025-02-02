import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { useCollage } from "../hooks/useCollage";
import { useFilters } from "../hooks/useFilters";
import { useWebSocket } from "../contexts/WebSocketContext";
import Konva from "konva";
import Toolbar from "../components/Toolbar";
import TextOverlay from "../components/TextOverlay";

const CollageEditor: React.FC = () => {
  // Canvas ref for Konva
  const stageRef = useRef<Konva.Stage | null>(null);
  
  // Get WebSocket send and listener functions
  const { sendMessage, addMessageListener } = useWebSocket();

  // useCollage hook returns functions to modify collage state
  const {
    elements,
    addImage,
    addText,
    undo,
    redo,
    deleteSelected,
    setSelectedId,
  } = useCollage(stageRef);

  // useFilters hook for applying image effects
  const {
    applyGrayscale,
    adjustBrightness,
    applyBlur,
    applySepia,
    applyInvert,
    adjustContrast,
    applyPixelation,
    adjustHue,
  } = useFilters(stageRef.current);

  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#000000");

  // Listen for WebSocket messages for real-time collaboration.
  useEffect(() => {
    const handleWebSocketMessage = (message: any) => {
      if (message.type === "addImage") {
        // When another user adds an image, add it to the canvas.
        addImage(message.src);
      } else if (message.type === "applyFilter") {
        // Apply filters coming from collaborators.
        switch (message.filter) {
          case "grayscale":
            applyGrayscale();
            break;
          case "brightness":
            adjustBrightness(message.value);
            break;
          case "blur":
            applyBlur(message.value);
            break;
          case "sepia":
            applySepia();
            break;
          case "invert":
            applyInvert();
            break;
          case "contrast":
            adjustContrast(message.value);
            break;
          case "pixelation":
            applyPixelation(message.value);
            break;
          case "hue":
            adjustHue(message.value);
            break;
          default:
            break;
        }
      }
    };

    const removeListener = addMessageListener(handleWebSocketMessage);
    return () => {
      removeListener();
    };
  }, [
    addMessageListener,
    addImage,
    applyGrayscale,
    adjustBrightness,
    applyBlur,
    applySepia,
    applyInvert,
    adjustContrast,
    applyPixelation,
    adjustHue,
  ]);

  // When the user clicks "Add Image", broadcast and update locally.
  const handleAddImage = (src: string) => {
    sendMessage({ type: "addImage", src });
    addImage(src);
  };

  // Similarly, handle filters and text additions.
  const handleApplyFilter = (filter: string, value?: number) => {
    sendMessage({ type: "applyFilter", filter, value });
    switch (filter) {
      case "grayscale":
        applyGrayscale();
        break;
      case "brightness":
        adjustBrightness(value || 0);
        break;
      case "blur":
        applyBlur(value || 0);
        break;
      case "sepia":
        applySepia();
        break;
      case "invert":
        applyInvert();
        break;
      case "contrast":
        adjustContrast(value || 0);
        break;
      case "pixelation":
        applyPixelation(value || 0);
        break;
      case "hue":
        adjustHue(value || 0);
        break;
      default:
        break;
    }
  };

  const handleAddText = (text: string) => {
    addText(text);
  };

  const handleChangeFont = (font: string) => {
    setFont(font);
  };

  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  return (
    <div className="p-4">
      {/* Toolbar Section */}
      <div className="mb-4">
        <Toolbar onAddText={handleAddText} />
      </div>
      {/* Text Overlay Controls */}
      <div className="mb-4">
        <TextOverlay onChangeFont={handleChangeFont} onChangeColor={handleChangeColor} />
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Example button for adding an image.
            In a real app, replace "image_url_here" with a dynamic URL or file input result. */}
        <button
          onClick={() => handleAddImage("image_url_here")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Image
        </button>
        <button
          onClick={() => handleApplyFilter("grayscale")}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Grayscale
        </button>
        <button
          onClick={() => handleApplyFilter("brightness", 0.2)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Increase Brightness
        </button>
        <button
          onClick={() => handleApplyFilter("blur", 10)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Blur
        </button>
        <button
          onClick={() => handleApplyFilter("sepia")}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Sepia
        </button>
        <button
          onClick={() => handleApplyFilter("invert")}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Invert
        </button>
        <button
          onClick={() => handleApplyFilter("contrast", 0.5)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Increase Contrast
        </button>
        <button
          onClick={() => handleApplyFilter("pixelation", 5)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Pixelate
        </button>
        <button
          onClick={() => handleApplyFilter("hue", 90)}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
        >
          Adjust Hue
        </button>
      </div>
      {/* Undo/Redo/Delete Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={undo}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Undo
        </button>
        <button
          onClick={redo}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Redo
        </button>
        <button
          onClick={deleteSelected}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Delete Selected
        </button>
      </div>
      {/* Canvas */}
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <Stage
          ref={stageRef}
          width={600}
          height={400}
          className="bg-white"
        >
          <Layer>
            {elements.map(({ id, node }) => (
              // Render each element on the canvas.
              <node.type
                key={id}
                {...node}
                onClick={() => setSelectedId(id)}
                draggable
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CollageEditor;
