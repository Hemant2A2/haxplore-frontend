class WebSocketService {
    private socket: WebSocket | null = null;
  
    connect(url: string) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => console.log("WebSocket connected");
      this.socket.onclose = () => console.log("WebSocket disconnected");
      this.socket.onerror = (error) => console.error("WebSocket error:", error);
    }
  
    sendMessage(message: string) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      }
    }
  
    onMessage(callback: (data: string) => void) {
      if (this.socket) {
        this.socket.onmessage = (event) => callback(event.data);
      }
    }
  }
  
  export default new WebSocketService();
  