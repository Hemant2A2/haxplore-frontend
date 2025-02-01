import React, { useEffect } from "react";
import { useWebSocket } from "../contexts/WebSocketContext";
import CollageEditor from "../components/CollageEditor";

const Collaboration: React.FC = () => {
  const { addMessageListener } = useWebSocket();

  useEffect(() => {
    const handleWebSocketMessage = (message: any) => {
      // Handle incoming WebSocket messages if needed
    };

    addMessageListener(handleWebSocketMessage);

    return () => {
      addMessageListener(() => {});
    };
  }, [addMessageListener]);

  return (
    <div className="p-4 border-t border-gray-300">
      <h3 className="font-bold mb-2">Collaboration Collage Editor</h3>
      <CollageEditor />
    </div>
  );
};

export default Collaboration;