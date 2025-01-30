import React, { useEffect, useState } from "react";

const Collaboration: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    setWs(websocket);

    websocket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send("Hello from client!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Real-time Collaboration</h1>
      <button onClick={sendMessage} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Send Message
      </button>
      <ul className="mt-4">
        {messages.map((msg, idx) => (
          <li key={idx} className="border p-2 my-2">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collaboration;
