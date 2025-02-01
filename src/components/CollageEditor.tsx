import React, { useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useCollage } from "../hooks/useCollage";
import { useFilters } from "../hooks/useFilters";
import Konva from "konva";

const CollageEditor: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
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

  return (
    <div>
      <button onClick={() => addImage("image_url_here")}>Add Image</button>
      <button onClick={() => addText("Sample Text")}>Add Text</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={deleteSelected}>Delete</button>

      {/* Filters */}
      <button onClick={applyGrayscale}>Grayscale</button>
      <button onClick={() => adjustBrightness(0.2)}>Increase Brightness</button>
      <button onClick={() => applyBlur(10)}>Blur</button>
      <button onClick={applySepia}>Sepia</button>
      <button onClick={applyInvert}>Invert</button>
      <button onClick={() => adjustContrast(0.5)}>Increase Contrast</button>
      <button onClick={() => applyPixelation(5)}>Pixelate</button>
      <button onClick={() => adjustHue(90)}>Adjust Hue</button>

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
