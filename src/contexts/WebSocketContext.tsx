import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface WebSocketContextProps {
  sendMessage: (message: any) => void;
  addMessageListener: (callback: (message: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<{ url: string; children: React.ReactNode }> = ({ url, children }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef<((message: any) => void)[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      listenersRef.current.forEach((listener) => listener(message));
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected");
    }
  };

  const addMessageListener = (callback: (message: any) => void): (() => void) => {
    listenersRef.current.push(callback);
    // Return a cleanup function that removes this listener.
    return () => {
      listenersRef.current = listenersRef.current.filter(
        (listener) => listener !== callback
      );
    };
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, addMessageListener }}>
      {isConnected ? children : <div>Connecting to WebSocket...</div>}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
