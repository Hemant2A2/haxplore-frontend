import { useState, useRef } from "react";
import Konva from "konva";
// import {
//   Image as KonvaImage,
// } from "react-konva";
import { Text as KonvaText } from "react-konva";

export const useCollage = (stageRef: React.RefObject<Konva.Stage>) => {
  const [elements, setElements] = useState<{ id: string; node: any }[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const history = useRef<{ id: string; node: any }[][]>([]);
  const historyIndex = useRef<number>(-1);

  // Add Image
  const addImage = (src: string) => {
    if (!stageRef.current) return;
    const id = `image-${Date.now()}`;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const imageNode = new Konva.Image({
        id,
        image: img,
        x: Math.random() * 400,
        y: Math.random() * 300,
        scaleX: 0.5,
        scaleY: 0.5,
        draggable: true,
      });

      setElements((prev) => [...prev, { id, node: imageNode }]);
      saveHistory();
    };
  };

  // Add Text
  const addText = (text: string) => {
    if (!stageRef.current) return;
    const id = `text-${Date.now()}`;

    const textNode = new (KonvaText as any )({
      id,
      text,
      x: Math.random() * 200,
      y: Math.random() * 200,
      fontSize: 20,
      fill: "black",
      draggable: true,
    });

    setElements((prev) => [...prev, { id, node: textNode }]);
    saveHistory();
  };

  // Save History for Undo/Redo
  const saveHistory = () => {
    history.current = history.current.slice(0, historyIndex.current + 1);
    history.current.push([...elements]);
    historyIndex.current++;
  };

  const undo = () => {
    if (historyIndex.current <= 0) return;
    historyIndex.current--;
    setElements([...history.current[historyIndex.current]]);
  };

  const redo = () => {
    if (historyIndex.current >= history.current.length - 1) return;
    historyIndex.current++;
    setElements([...history.current[historyIndex.current]]);
  };

  // Delete Selected Element
  const deleteSelected = () => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
    saveHistory();
  };

  //  Bring Forward / Send Backward
  const changeLayerPosition = (direction: "forward" | "backward") => {
    if (!selectedId) return;
    setElements((prev) => {
      const index = prev.findIndex((el) => el.id === selectedId);
      if (index === -1) return prev;

      const newElements = [...prev];
      if (direction === "forward" && index < newElements.length - 1) {
        [newElements[index], newElements[index + 1]] = [
          newElements[index + 1],
          newElements[index],
        ];
      } else if (direction === "backward" && index > 0) {
        [newElements[index], newElements[index - 1]] = [
          newElements[index - 1],
          newElements[index],
        ];
      }

      return newElements;
    });
  };

  // Animate Elements
  const animateElement = (type: "bounce" | "fade" | "rotate" | "scale") => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === selectedId) {
          const node = el.node;
          if (!node) return el;

          if (type === "bounce") {
            node.to({
              y: node.y() - 20,
              duration: 0.2,
              yoyo: true,
              easing: Konva.Easings.EaseInOut,
            });
          }

          if (type === "fade") {
            node.to({
              opacity: node.opacity() === 1 ? 0.5 : 1,
              duration: 0.5,
              easing: Konva.Easings.Linear,
            });
          }

          if (type === "rotate") {
            node.to({
              rotation: node.rotation() + 360,
              duration: 1,
              easing: Konva.Easings.EaseInOut,
            });
          }

          if (type === "scale") {
            node.to({
              scaleX: node.scaleX() === 1 ? 1.5 : 1,
              scaleY: node.scaleY() === 1 ? 1.5 : 1,
              duration: 0.5,
              easing: Konva.Easings.EaseInOut,
            });
          }
        }
        return el;
      })
    );
  };

  return {
    elements,
    setElements,
    addImage,
    addText,
    undo,
    redo,
    deleteSelected,
    changeLayerPosition,
    animateElement,
    setSelectedId,
  };
};
