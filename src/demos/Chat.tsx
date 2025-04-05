import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  user: string;
  time: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [usersOnline, setUsersOnline] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Determine WebSocket URL based on environment
  const getWebSocketUrl = () => {
    // For local development
    if (window.location.hostname === 'localhost') {
      return 'ws://localhost:8000/ws';
    }
    
    // For production - use secure WebSocket with current host
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws`;
  };

  // Check if this is a pop-up window
  const isPopupWindow = (window as any).opener !== null;

  // Connect to the WebSocket server when the component mounts
  useEffect(() => {
    const connectWebSocket = () => {
      const wsUrl = getWebSocketUrl();
      console.log(`Attempting to connect to WebSocket: ${wsUrl}`);

      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log("WebSocket connection established successfully");
        setIsConnected(true);
        setConnectionError("");
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received WebSocket message:", data);
          
          if (data.type === "message") {
            setMessages((prevMessages) => [...prevMessages, data.data]);
          } else if (data.type === "users_online") {
            setUsersOnline(data.data);
          } else if (data.type === "typing") {
            setTypingUser(data.data);
            setIsTyping(true);
            // Clear the typing indicator after 2 seconds
            setTimeout(() => {
              setIsTyping(false);
            }, 2000);
          }
        } catch (parseError) {
          console.error("Error parsing WebSocket message:", parseError);
        }
      };
      
      ws.onclose = (event) => {
        console.log("WebSocket connection closed", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        setIsConnected(false);
        
        // Try to reconnect after a delay
        setTimeout(connectWebSocket, 3000);
      };
      
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnectionError("WebSocket connection error");
        
        // Try to reconnect after a delay
        setTimeout(connectWebSocket, 3000);
      };

      wsRef.current = ws;
    };
    
    connectWebSocket();
    
    // Clean up on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Existing methods remain the same
  const sendMessage = (type: string, data: any): void => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type,
        data
      }));
    } else {
      console.warn("WebSocket not connected. Cannot send message.");
    }
  };

  const handleJoin = (e: React.FormEvent): void => {
    e.preventDefault();
    if (username.trim() && wsRef.current) {
      // Send the username as the data for the join message
      sendMessage("join", username);
      setIsJoined(true);
      
      // Clear existing messages when joining
      setMessages([]);
    }
  };

  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    if (message.trim() && username && wsRef.current) {
      const newMessage: Message = {
        text: message,
        user: username,
        time: new Date().toLocaleTimeString()
      };
      sendMessage("message", newMessage);
      setMessage("");
    }
  };

  const handleTyping = (): void => {
    if (wsRef.current && isJoined) {
      sendMessage("typing", username);
    }
  };

  const formatTime = (time: string): string => {
    return time.split(":").slice(0, 2).join(":");
  };

  return (
    <>
      <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        {!isJoined ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Join the Chat</h2>
            <div className="mb-4 flex items-center">
              Connection Status: 
              {isConnected ? (
                <span className="text-green-500 ml-2">● Connected</span>
              ) : (
                <span className="text-red-500 ml-2">● Disconnected</span>
              )}
            </div>
            {connectionError && (
              <div className="text-red-500 mb-4 text-center">
                {connectionError}
                <br />
                Please check your network connection
              </div>
            )}
            <form onSubmit={handleJoin} className="w-full max-w-sm">
              <div className="flex items-center border-b border-gray-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter your name to join as guest"
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                  required
                  disabled={!isConnected}
                />
                <button
                  className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                  disabled={!isConnected}
                >
                  Join Chat
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Existing joined chat UI remains the same
          <>
            <div className="bg-gray-800 p-4 flex justify-between items-center">
              <h2 className="text-white text-lg font-bold">Portfolio Chat</h2>
              <div className="flex items-center">
                <div className="text-green-400 text-sm mr-2">{usersOnline} user(s) online</div>
                {isConnected ? (
                  <span className="text-green-500">●</span>
                ) : (
                  <span className="text-red-500">●</span>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${msg.user === username ? "text-right" : ""}`}
                >
                  <div 
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.user === "System" 
                        ? "bg-gray-300 text-gray-800" 
                        : msg.user === username 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.user !== "System" && (
                      <div className="font-bold">
                        {msg.user === username ? "You" : msg.user}
                      </div>
                    )}
                    <div>{msg.text}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {formatTime(msg.time)}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-500 italic text-sm ml-2">
                  {typingUser} is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="bg-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  className="flex-1 bg-white rounded-l-lg px-4 py-2 focus:outline-none"
                  type="text"
                  placeholder={isConnected ? "Type a message..." : "Reconnecting..."}
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                  onKeyPress={handleTyping}
                  disabled={!isConnected}
                />
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg disabled:bg-gray-400"
                  type="submit"
                  disabled={!isConnected}
                >
                  Send
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      
      {/* Only show the CTA if this is not a popup window */}
      {!isPopupWindow && <ChatCTA />}
    </>
  );
};

export default ChatComponent;

// ChatCTA component remains the same
const ChatCTA = () => {
  const openChatInNewWindow = () => {
    (window as any).open(window.location.href, "_blank", "width=500,height=700");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="mb-2 bg-white text-gray-700 p-2 rounded-lg shadow-lg text-sm animate-pulse">
        Try opening multiple windows to chat with yourself!
      </div>
      <button
        onClick={openChatInNewWindow}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        Open New Chat Window
      </button>
    </div>
  );
};