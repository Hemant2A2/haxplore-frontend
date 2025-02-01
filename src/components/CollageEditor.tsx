import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { useCollage } from "../hooks/useCollage";
import { useFilters } from "../hooks/useFilters";
import { useWebSocket } from "../contexts/WebSocketContext";
import Konva from "konva";
import Toolbar from "../components/Toolbar";
import TextOverlay from "../components/TextOverlay";

const CollageEditor: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const { sendMessage, addMessageListener } = useWebSocket();
  const {
    elements,
    addImage,
    addText,
    undo,
    redo,
    deleteSelected,
    setSelectedId,
  } = useCollage(stageRef);
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

  useEffect(() => {
    const handleWebSocketMessage = (message: any) => {
      if (message.type === "addImage") {
        addImage(message.src);
      } else if (message.type === "applyFilter") {
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

    addMessageListener(handleWebSocketMessage);

    return () => {
      addMessageListener(() => {});
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

  const handleAddImage = (src: string) => {
    sendMessage({ type: "addImage", src });
    addImage(src);
  };

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
    <div>
      <Toolbar onAddText={handleAddText} />
      <TextOverlay onChangeFont={handleChangeFont} onChangeColor={handleChangeColor} />
      <button onClick={() => handleAddImage("image_url_here")}>
        Add Image
      </button>
      <button onClick={() => handleApplyFilter("grayscale")}>Grayscale</button>
      <button onClick={() => handleApplyFilter("brightness", 0.2)}>
        Increase Brightness
      </button>
      <button onClick={() => handleApplyFilter("blur", 10)}>Blur</button>
      <button onClick={() => handleApplyFilter("sepia")}>Sepia</button>
      <button onClick={() => handleApplyFilter("invert")}>Invert</button>
      <button onClick={() => handleApplyFilter("contrast", 0.5)}>
        Increase Contrast
      </button>
      <button onClick={() => handleApplyFilter("pixelation", 5)}>
        Pixelate
      </button>
      <button onClick={() => handleApplyFilter("hue", 90)}>Adjust Hue</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={deleteSelected}>Delete Selected</button>

      <Stage
        ref={stageRef}
        width={600}
        height={400}
        className="border border-gray-300 mt-4"
      >
        <Layer>
          {elements.map(({ id, node }) => (
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
  );
};

export default CollageEditor;