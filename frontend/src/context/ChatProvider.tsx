import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
const ChatContext: any = createContext({});

const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const userData: Object = JSON.parse(
        localStorage.getItem("userInfo") || ""
      );
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
